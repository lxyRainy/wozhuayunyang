# wozhuayunyang
握爪云养h5页面

## 视频注意事项

- ios 部分型号会出现第一次打开以后黑屏但是有声音的情况。解决：
```
poster="${
        item.file_url
      }?x-oss-process=video/snapshot,t_1,f_jpg,m_fast"
```

## 图片不可点击

- img标签需加style属性 cursor:pointer

