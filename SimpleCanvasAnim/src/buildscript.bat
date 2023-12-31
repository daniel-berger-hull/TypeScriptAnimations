echo Will build the project...
tsc
mkdir img
copy .\src\*.html .\public 
copy .\src\*.css .\public 
copy .\src\img\*.png .\public\img