---
hide_title: true
sidebar_label: Basics - Bash & File Systems
---

# Basics - Bash & File Systems

Open a terminal (with a Bash shell) by `Ctrl+ALt+T`.

## Bash Syntax
Watch the following video:
<iframe width="560" height="315" src="https://www.youtube.com/embed/hgFBRZmwpSM" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

Keypoints of the video:
- `~` and `$`
- Bash syntax (command base): _program-name arguments_
- the search paths when executing: 
    - the `PATH` variable, 
    - the absolute path, denoted with leading `/`, or 
    - the relative path, the PWD (current working directory)

> _**Excercise**: What is the different between executing `foo` and `./foo`?_

> _**Excercise**: How to pass multiple arguments when executing a program?_

## Navigating through Directories and Locating Files

:::tip
Learn the following:
1. [The Edx Link (Chapter 7)](https://courses.edx.org/courses/course-v1:LinuxFoundationX+LFS101x+1T2017/course/)
2. [Tutorial Point (Unix for Beginners)](https://www.tutorialspoint.com/unix/unix-file-management.htm)
3. [Shell Tutorials](https://linuxjourney.com/lesson/the-shell)
:::

You should be able to:
1. Navigate back and forth through directories, and listing files
2. Create, remove, move, copy files and directories
3. Check directory / file permission and modify the permissions (`chown`,`chmod`)
4. Search executables, files by name (`locate`,`whereis`,`find . -name "foo*"`)
5. Search content within files [(Reference)](https://stackoverflow.com/questions/16956810/how-do-i-find-all-files-containing-specific-text-on-linux)


### Questions for Thought
- What does `~` represent in a path?
- What is the difference between `ls` and `ls -a`?
- How to differentiate between an absolute path and a relative path? 
- What does environment variable PATH do? How to view, set, append environment variables?
- What can `which` `whereis` and `locate` do? What are their differences? [](https://askubuntu.com/questions/832562/difference-among-whereis-locate-and-findcommand)

## Permissions, User, User Groups

## More Practical Commands (0.5Hr)

### Know More about a File

- `stat` to show the modification date etc
- `file` to know the binary type (architecture)
- `ldd` to know the dynamic linkage (.so file links)

### Uncompress Zip File
[Reference](https://www.hostingmanual.net/zipping-unzipping-files-unix/)

Tar file:
`tar -czvf archive.tar.gz /usr/local/something`

Unzip file with permission preserved:
`tar -xpf file`