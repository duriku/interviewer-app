package com.jksoftware.service;

import com.jksoftware.converter.QuestionConverter;
import com.jksoftware.dto.QuestionDTO;
import com.jksoftware.model.Question;
import org.apache.log4j.Logger;
import org.apache.lucene.analysis.standard.StandardAnalyzer;
import org.apache.lucene.document.Document;
import org.apache.lucene.index.DirectoryReader;
import org.apache.lucene.index.IndexReader;
import org.apache.lucene.index.IndexWriter;
import org.apache.lucene.index.IndexWriterConfig;
import org.apache.lucene.index.Term;
import org.apache.lucene.search.BooleanClause;
import org.apache.lucene.search.BooleanQuery;
import org.apache.lucene.search.IndexSearcher;
import org.apache.lucene.search.MatchAllDocsQuery;
import org.apache.lucene.search.Query;
import org.apache.lucene.search.ScoreDoc;
import org.apache.lucene.search.TermQuery;
import org.apache.lucene.search.TopDocs;
import org.apache.lucene.search.TotalHitCountCollector;
import org.apache.lucene.store.FSDirectory;

import java.io.IOException;
import java.nio.file.Paths;
import java.util.List;
import java.util.Objects;
import java.util.function.Function;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import static com.jksoftware.config.InterviewerConfig.LAMBDA_INDEX_FOLDER;
import static com.jksoftware.converter.QuestionConverter.questionToDocument;
import static java.util.Objects.nonNull;

public class IndexService {
    private static final Logger LOG = Logger.getLogger(IndexService.class);
    private static final IndexService instance = new IndexService();

    private StandardAnalyzer analyzer;
    private FSDirectory index;
    private IndexWriter writer;

    private IndexService() {
        this.analyzer = new StandardAnalyzer();
        try {
            this.index = FSDirectory.open(Paths.get(LAMBDA_INDEX_FOLDER));
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    public static IndexService getInstance() {
        return instance;
    }

    public List<QuestionDTO> searchQuestions(final String search, final List<String> tags) throws Exception {
        final Query query = parseQuery(search, tags);
        // final Query allDocsQuery = new MatchAllDocsQuery(); RETRIEVE ALL DOCS FOR TAGCLOUD!

        // search the query
        int hitsPerPage = 10;
        final IndexReader reader = DirectoryReader.open(index);
        final IndexSearcher searcher = new IndexSearcher(reader);

//        final TotalHitCountCollector countCollector = new TotalHitCountCollector();
//        searcher.search(query, countCollector);
//        searcher.collectionStatistics("tags");
        final TopDocs docs = searcher.search(query, hitsPerPage);
        return Stream.of(docs.scoreDocs)
                .map(getScoreDocDocumentFunction(searcher))
                .filter(Objects::nonNull)
                .map(QuestionConverter::documentToQuestionDTO)
                .collect(Collectors.toList());
    }


    public void indexQuestion(final Question question) throws IOException {
        this.writer = new IndexWriter(index, new IndexWriterConfig(analyzer));
        addQuestion(question, writer);
        writer.close();
    }

    // NOTE: use when recreate the index from mongo!
    public void reindexAllQuestions(final List<Question> questions) throws IOException {
        final IndexWriterConfig config = new IndexWriterConfig(analyzer);
        config.setOpenMode(IndexWriterConfig.OpenMode.CREATE);
        this.writer = new IndexWriter(index, config);

        questions.forEach(question -> {
            LOG.info("indexing " + question);
            this.addQuestion(question, writer);
        });
        writer.close();
    }

    public void updateIndex(final Question question) throws IOException {
        this.writer = new IndexWriter(index, new IndexWriterConfig(analyzer));
        updateQuestion(question, writer);
        writer.close();
    }

    public void removeQuestionFromIndex(final String questionId) throws IOException {
        this.writer = new IndexWriter(index, new IndexWriterConfig(analyzer));
        deleteQuestion(questionId, writer);
        writer.close();
    }

    private BooleanQuery parseQuery(final String title, final List<String> tags) {
        final BooleanQuery.Builder mainQueryBuilder = new BooleanQuery.Builder();
        if (nonNull(title)) {
            final Query titleQuery = new TermQuery(new Term("title", title));
            mainQueryBuilder.add(titleQuery, BooleanClause.Occur.MUST);
        }

        if (nonNull(tags)) {
            final BooleanQuery.Builder tagsQueryBuilder = new BooleanQuery.Builder();
            tags.forEach(tag -> {
                final Query tagQuery = new TermQuery(new Term("tags", tag));
                tagsQueryBuilder.add(tagQuery, BooleanClause.Occur.SHOULD);
            });
            mainQueryBuilder.add(tagsQueryBuilder.build(), BooleanClause.Occur.MUST);
        }

        return mainQueryBuilder.build();
    }

    private void addQuestion(final Question question, final IndexWriter writer) {
        final Document doc = questionToDocument(question);
        try {
            writer.addDocument(doc);
        } catch (IOException e) {
            throw new RuntimeException("Could not add doc", e);
        }
    }

    private void updateQuestion(final Question question, final IndexWriter writer) {
        final Document doc = questionToDocument(question);
        try {
            // NOTE update basically deletes + adds the updated document
            writer.deleteDocuments(new Term("_id", question.getId().toHexString()));
            writer.addDocument(doc);
        } catch (IOException e) {
            throw new RuntimeException("Could not add doc", e);
        }
    }

    private void deleteQuestion(final String questionId, final IndexWriter writer) {
        try {
            writer.deleteDocuments(new Term("_id", questionId));
        } catch (IOException e) {
            throw new RuntimeException("Could not add doc", e);
        }
    }

    private Function<ScoreDoc, Document> getScoreDocDocumentFunction(final IndexSearcher searcher) {
        return e -> {
            try {
                return searcher.doc(e.doc);
            } catch (IOException ex) {
                LOG.error("Could not search doc from the index!", ex);
                return null;
            }
        };
    }

}
