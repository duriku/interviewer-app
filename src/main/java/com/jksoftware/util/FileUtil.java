package com.jksoftware.util;

import com.jksoftware.App;
import org.zeroturnaround.zip.ZipUtil;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.stream.Stream;

import static java.util.stream.Collectors.toList;

public class FileUtil {

    public static String readFileFromResources(final String fileName) throws IOException {
        return new String(Files.readAllBytes(Paths.get(App.class.getClassLoader().getResource(fileName).getPath())));
    }

    public static List<Path> filesFromDirectory(final String dir){
        try (Stream<Path> paths = Files.walk(Paths.get(dir))) {
            return paths.filter(Files::isRegularFile).collect(toList());
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    public static void zipDirectory(final String dir, final String zippedFileName){
        ZipUtil.pack(new File(dir), new File(zippedFileName));
    }

    public static void unZipDirectory(final String zippedFileName, final String dir){
        ZipUtil.unpack(new File(zippedFileName), new File(dir));
    }
}
