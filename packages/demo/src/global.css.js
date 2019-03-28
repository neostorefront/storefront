const globalStyle = `
  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed,
  figure, figcaption, footer, header, hgroup,
  menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }

  /* HTML5 display-role reset for older browsers */
  article, aside, details, figcaption, figure,
  footer, header, hgroup, menu, nav, section {
    display: block;
  }

  html {
    font-size: 62.5%;
  }

  body {
    font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol";
    line-height: 1;
    font-size: 1.6rem;
    color: #000;
    background-color: #fff;
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;
    -webkit-font-feature-settings: "pnum";
    font-feature-settings: "pnum";
    font-variant-numeric: proportional-nums;
  }

  ol, ul {
    list-style: none;
  }

  blockquote, q {
    quotes: none;
  }

  blockquote:before, blockquote:after,
  q:before, q:after {
    content: '';
    content: none;
  }

  table {
    border-collapse: collapse;
    border-spacing: 0;
  }

  pre {
    display: block;
    padding: 2rem;
    margin-top: 4rem;
    overflow: auto;
    font-size: 85%;
    line-height: 1.45;
    border-radius: 5px;
    border: 1px solid #ddd;
  }

  video {
    max-width: 100%;
  }

  p {
    margin-bottom: 2rem;
  }

  .gatsby-image-wrapper {
    z-index: -1;
  }
  
  @import url('https://fonts.googleapis.com/css?family=Teko|Open+Sans+Condensed:700');
  
  .cms-index-index .page-title{
  position:absolute;width:1px;height:1px;margin:-1px;padding:0;overflow:hidden;clip:rect(0, 0, 0, 0);border:0
  }
  .widget .block-promo img{max-width:none;}
  .block-promo{box-sizing:border-box;overflow:hidden;
  position:relative;
  display:block;width:100%;color:#333 !important}
  .block-promo:hover{text-decoration:none}
  .block-promo .content{display:block;box-sizing:border-box;position:absolute;z-index:1;overflow:hidden;padding:25px 35px 35px}.block-promo .title{display:block;font-weight:300;font-size:3.2rem;line-height:1.2;margin-bottom:15px}.block-promo .info{display:block;font-weight:300;font-size:2.2rem;margin-bottom:20px}.block-promo .more{font-size:1.6rem}.block-promo .icon.more{display:inline-block;text-decoration:none}.block-promo .icon.more:after{font-family:'luma-icons';content:'\\e608';font-size:12px;line-height:inherit;color:inherit;overflow:hidden;speak:none;font-weight:normal;-webkit-font-smoothing:antialiased;display:inline-block;vertical-align:middle;text-align:center;margin:0 0 0 5px}.block-promo .button.more{font-size:1.8rem;background-image:none;background:#1979c3;padding:7px 15px;color:#fff;border:1px solid #1979c3;cursor:pointer;display:inline-block;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:1.4rem;font-weight:700;box-sizing:border-box;vertical-align:middle;border-radius:3px;text-decoration:none;padding:10px 15px}.block-promo .button.more:focus,.block-promo .button.more:active{background:#006bb4;border:1px solid #006bb4;color:#fff}.block-promo .button.more:hover{background:#006bb4;border:1px solid #006bb4;color:#fff}.block-promo .button.more.disabled,.block-promo .button.more[disabled],fieldset[disabled] .block-promo .button.more{cursor:default;pointer-events:none;opacity:.5}.block-promo .title+.button{margin-top:10px}.block-promo sup{top:-0.2em}.block-promo-2columns .content{padding:20px 25px}.womens-main .content,.womens-pants .content,.training-main .content,.training-erin .content,.sale-main .content,.sale-women .content,.mens-main .content,.mens-pants .content,.gear-main .content,.gear-equipment .content,.new-main .content,.new-eco .content,.home-main .content,.home-performance .content,.home-eco .content,.collection-eco .content,.collection-performance .content{background-color:rgba(255,255,255,0.9)}.sale-main,.mens-main,.gear-main,.womens-main{max-width:1080px}.sale-women,.sale-mens,.mens-pants,.womens-pants,.gear-fitnes,.gear-equipment,.new-performance,.new-eco{max-width:580px}.training-main,.training-erin,.collection-eco,.collection-performance,.home-main{max-width:1280px}.home-pants .content{top:0;left:0;width:80%}.home-pants .title{display:block;font-weight:600;font-family:Halvetica Neue,Helvetica,Arial,sans-serif;white-space:nowrap;margin-bottom:0}
  .home-t-shirts{background:#ffdd16;}.home-erin{height:373px}.home-erin .content{top:0;right:0;width:60%}.home-performance{height:664px}.home-performance .content{top:25px;right:25px;left:25px}.home-eco{height:274px}.new-performance .icon.more{white-space:nowrap}.block-promo-hp .bg-white,.block-promo-hp .home-erin .content{padding:20px}.womens-erin{background:#f4f4f4}.womens-erin .content{padding:20px 35px}.training-main{height:372px}.training-main .title{margin-bottom:0;line-height:1.4}.training-main .title span{font-weight:600}.training-erin{height:214px}.training-erin .content{padding:15px;text-align:center}.training-erin .info{margin-bottom:0}.training-on-demand,.training-videos{color:#fff !important}.training-on-demand .content,.training-videos .content{position:static;text-align:center}.training-on-demand .icon.calendar,.training-videos .icon.calendar,.training-on-demand .icon.download,.training-videos .icon.download{margin-top:-10px;display:block;text-decoration:none}.training-on-demand .icon.calendar>span,.training-videos .icon.calendar>span,.training-on-demand .icon.download>span,.training-videos .icon.download>span{position:absolute;width:1px;height:1px;margin:-1px;padding:0;overflow:hidden;clip:rect(0, 0, 0, 0);border:0}.training-on-demand .icon.calendar:before,.training-videos .icon.calendar:before,.training-on-demand .icon.download:before,.training-videos .icon.download:before{font-family:'luma-icons';font-size:32px;line-height:inherit;color:inherit;overflow:hidden;speak:none;font-weight:normal;-webkit-font-smoothing:antialiased;display:inline-block;vertical-align:middle;text-align:center}.training-on-demand .icon.calendar:before,.training-videos .icon.calendar:before{content:'\\e612'}.training-on-demand .icon.download:before,.training-videos .icon.download:before{content:'\\e626'}.training-on-demand .icon.more,.training-videos .icon.more{position:absolute;left:0;right:0;bottom:25px}.training-on-demand .info,.training-videos .info{font-size:16px}.training-on-demand{background:#00ade2}.training-videos{background:#5a5e62}.sale-women,.sale-mens{height:372px}.sale-mens .content{top:0;right:0;width:60%}.sale-20-off .content,.sale-free-shipping .content,.sale-womens-t-shirts .content{padding:15px 20px}.sale-20-off{background:#f4f4f4}.sale-20-off .title{font-size:4rem;font-weight:700;white-space:nowrap}.sale-20-off img{position:absolute;z-index:0;bottom:0;right:0}.sale-20-off .content{width:75%;position:relative}.sale-free-shipping{background:#71b54e;color:#fff !important}.sale-free-shipping .content{position:static}.sale-free-shipping img{display:block;margin:0 auto 10px;max-width:100% !important}.sale-womens-t-shirts{background:#fedd16}.sale-womens-t-shirts .content{position:static}.sale-womens-t-shirts img{max-width:95% !important}.mens-main .content{width:45%}.womens-main,.home-main,.mens-main,.new-main,.sale-main,.gear-main{height:450px}.womens-t-shirts,.mens-t-shirts{background:#ffdd17}.womens-t-shirts img,.mens-t-shirts img{max-width:100% !important}.womens-t-shirts .content,.mens-t-shirts .content{position:static}.womens-pants,.mens-pants,.gear-fitnes,.gear-equipment,.new-performance,.new-eco{height:372px}.womens-pants .info span,.mens-pants .info span{display:block;font-size:4.4rem;font-family:Halvetica Neue,Helvetica,Arial,sans-serif;line-height:1.2;font-weight:600;white-space:nowrap}.womens-category-pants,.womens-category-tanks,.womens-category-shorts,.mens-category-tees,.mens-category-hoodies,.mens-category-shorts,.gear-category-bags,.gear-category-equipment,.gear-category-watches{background:#f4f4f4;min-height:170px}.womens-category-pants img,.womens-category-tanks img,.womens-category-shorts img,.mens-category-tees img,.mens-category-hoodies img,.mens-category-shorts img,.gear-category-bags img,.gear-category-equipment img,.gear-category-watches img{max-width:100% !important;position:absolute;z-index:0;top:0;right:0;left:60%}.womens-category-pants .content,.womens-category-tanks .content,.womens-category-shorts .content,.mens-category-tees .content,.mens-category-hoodies .content,.mens-category-shorts .content,.gear-category-bags .content,.gear-category-equipment .content,.gear-category-watches .content{padding:20px 0 50px 20px !important;position:static;width:60%;z-index:1}.womens-category-pants .title,.womens-category-tanks .title,.womens-category-shorts .title,.mens-category-tees .title,.mens-category-hoodies .title,.mens-category-shorts .title,.gear-category-bags .title,.gear-category-equipment .title,.gear-category-watches .title,.womens-category-pants .info,.womens-category-tanks .info,.womens-category-shorts .info,.mens-category-tees .info,.mens-category-hoodies .info,.mens-category-shorts .info,.gear-category-bags .info,.gear-category-equipment .info,.gear-category-watches .info{font-size:1.8rem}.womens-category-pants .title,.womens-category-tanks .title,.womens-category-shorts .title,.mens-category-tees .title,.mens-category-hoodies .title,.mens-category-shorts .title,.gear-category-bags .title,.gear-category-equipment .title,.gear-category-watches .title{font-weight:400;margin-bottom:5px}.womens-category-pants .more,.womens-category-tanks .more,.womens-category-shorts .more,.mens-category-tees .more,.mens-category-hoodies .more,.mens-category-shorts .more,.gear-category-bags .more,.gear-category-equipment .more,.gear-category-watches .more{position:absolute;z-index:1;bottom:20px}.gear-fitnes .content,.new-performance .content{right:0;top:0;width:65%}.collection-eco,.collection-performance{height:200px}.collection-eco .content,.collection-performance .content{padding:15px;text-align:center}.collection-eco .info,.collection-performance .info{margin-bottom:0}.collection-erin{background:#f4f4f4}.collection-erin .content{padding:20px 35px}.content-heading{text-align:center;margin:10px 0 25px}.content-heading .title{margin:0 0 5px}.content-heading .info{margin-bottom:0}.categories-menu .title{text-transform:uppercase;margin-bottom:10px;display:block}.categories-menu a:link,.categories-menu a:visited,.categories-menu a:hover,.categories-menu a:active{color:#333}.categories-menu .items{margin-bottom:40px}.categories-menu .items:last-child{margin-bottom:0}.cms-content-important{display:block;background:#f5f5f5}.cms-content-important h2{margin-top:0}.cms-content table{border:none}.cms-content table>thead>tr>th,.cms-content table>tbody>tr>th,.cms-content table>tfoot>tr>th,.cms-content table>thead>tr>td,.cms-content table>tbody>tr>td,.cms-content table>tfoot>tr>td{border:none}.cms-content table>thead>tr>th,.cms-content table>thead>tr>td{border-bottom:1px solid #d1d1d1}.cms-content table>tbody>tr:nth-child(even)>td,.cms-content table>tbody>tr:nth-child(even)>th{background:#f7f7f7}.cms-content table th{font-weight:400}.cms-content table td{font-weight:600}.cms-content .block .block-title{margin-bottom:15px}.cms-content .block .block-title>strong{display:none}.cms-content .block .box-title{display:inline-block;margin:0 0 15px}.cms-content .block .box-title>span{font-size:1.8rem;line-height:1.1;margin-top:1.5rem;margin-bottom:1rem;font-weight:300}.cms-content .block .block-content p:last-child{margin-bottom:0}@media only screen and (max-width:399px){.womens-pants img{width:250%;float:right;margin:-70px -140px 0 0}.mens-main img{margin-left:-180px}.training-main img,.gear-main img,.womens-main img{margin-left:-210px}.home-main img{margin-left:-310px}.sale-main img,.mens-pants img,.home-eco img{margin-left:-150px}.sale-mens img,.gear-fitnes img,.new-performance img{margin-left:-60px}.new-main img,.sale-women img,.training-erin img,.gear-equipment img{margin-left:-120px}.new-eco img{margin-left:-80px}.home-pants,.home-performance{height:580px}.home-pants img,.home-performance img{margin-left:-50px}}
  @media only screen and (max-width:767px){
  .blocks-promo{
  margin-left:-15px;margin-right:-15px
  }
  .block-promo{margin-bottom:8px}.block-promo .title{font-size:2.2rem}.block-promo .info{font-size:1.6rem;margin-bottom:10px}.block-promo .more{font-size:1.4rem}.block-promo .icon.more:after{font-size:1rem}.block-promo .button.more{font-size:1.2rem}.block-promo .content{padding:15px 20px 20px}.block-promo .button.more{padding:8px 12px}.home-pants{max-width:417px}.home-erin{max-width:426px}.home-performance{max-width:415px}.home-eco{max-width:858px}.home-pants,.home-performance{height:580px}.womens-main .content,.mens-main .content,.gear-main .content,.new-main .content,.home-main .content,.training-main .content,.sale-main .content{top:20px;right:0;width:65%}.training-main .title{font-size:2rem}.womens-erin .content,.collection-erin .content{position:static}.womens-erin img,.collection-erin img{display:block;margin:0 auto;max-width:75% !important}.sale-women .content{width:60%;bottom:20px;left:0}.sale-main .content{top:auto;bottom:20px}.sale-20-off{min-height:185px}.sale-20-off .title{font-size:4rem}.womens-category-pants .title,.womens-category-tanks .title,.womens-category-shorts .title,.mens-category-tees .title,.mens-category-hoodies .title,.mens-category-shorts .title,.gear-category-bags .title,.gear-category-equipment .title,.gear-category-watches .title{font-size:1.6rem}.womens-category-pants .info,.womens-category-tanks .info,.womens-category-shorts .info,.mens-category-tees .info,.mens-category-hoodies .info,.mens-category-shorts .info,.gear-category-bags .info,.gear-category-equipment .info,.gear-category-watches .info{font-size:1.4rem}.womens-pants .info span,.mens-pants .info span{font-size:4rem}.womens-pants .content,.mens-pants .content{max-width:220px;bottom:20px}.home-eco .content{width:65%;top:20px;right:0}.gear-fitnes .content,.new-performance .content,.home-erin .content{padding-top:30px}.gear-equipment .content,.new-eco .content{left:0;bottom:20px;max-width:220px}.training-erin .content{right:10px;bottom:10px;left:10px}.training-erin .title{margin-bottom:10px;font-size:1.8rem}.training-erin .info{font-size:1.2rem;margin-bottom:0}.training-on-demand .content,.training-videos .content{padding-top:25px;padding-bottom:45px}
  .home-pants img{position:absolute;z-index:0;bottom:-10px}.home-pants .title{font-size:4rem}.home-performance img{position:absolute;z-index:0;top:-20px}.womens-main .content,.training-main .content,.gear-main .content{top:auto;bottom:20px}.home-t-shirts .image{display:block;padding:20px 20px 0}.home-t-shirts img{max-width:100% !important}.home-t-shirts .content{position:static}.collection-eco .content,.collection-performance .content{right:10px;bottom:10px;left:10px}.collection-eco .title,.collection-performance .title{margin-bottom:10px;font-size:1.8rem}.collection-eco .info,.collection-performance .info{font-size:1.2rem}.collection-erin .title{font-size:1.8rem}.collection-erin .info{font-size:1.2rem}.content-heading .title{font-size:3rem}.content-heading .info{font-size:1.4rem}.cms-content-important{padding:15px;margin:0 -15px 15px}.cms-content table{margin:10px 0 0}.cms-content table thead th{font-size:1.1rem}.cms-content ul li{margin-bottom:5px}.cms-content .block .box{margin-bottom:30px}}@media all and (min-width:640px),print{.block-promo{margin-bottom:16px}.block-promo-wrapper:before,.block-promo-wrapper:after{content:"";display:table}.block-promo-wrapper:after{clear:both}.block-promo-wrapper .block-promo{float:left;border-right:16px solid #fff}.block-promo-2columns .block-promo{width:50%}.block-promo-3columns .block-promo{width:33.3%}.block-promo-2columns .block-promo:nth-child(2n),.block-promo-3columns .block-promo:nth-child(3n){border-right:0}}@media all and (min-width:768px),print{.block-promo-hp{margin:0 -8px}.block-promo-hp .block-promo{border-left:8px solid #fff;border-right:8px solid #fff}.block-promo-wrapper .home-performance{float:right}.home-pants,.home-erin,.home-performance{width:33.3%}.home-t-shirts,.home-eco{width:66.7%}
  .womens-main .content,.mens-main .content,.gear-main .content,.new-main .content,.home-main .content,.training-main .content,.sale-main .content{top:40px;right:40px;width:40%}
  .womens-t-shirts,.mens-t-shirts{height:372px}.womens-pants .content,.mens-pants .content{width:47%;left:20px;top:20px}.womens-erin,.home-t-shirts,.collection-erin{display:table}.womens-erin .content,.home-t-shirts .content,.collection-erin .content,.womens-erin .image,.home-t-shirts .image,.collection-erin .image{display:table-cell}.womens-erin .content,.home-t-shirts .content,.collection-erin .content{position:static}.womens-erin .image,.home-t-shirts .image,.collection-erin .image{vertical-align:bottom}.womens-erin img,.home-t-shirts img,.collection-erin img{float:right}.home-t-shirts{height:276px}.home-t-shirts .content{width:40%}.home-t-shirts .image{width:60%;vertical-align:middle;text-align:center;padding-left:10px}.home-t-shirts img{max-width:100% !important}.womens-category-pants,.womens-category-tanks,.womens-category-shorts,.mens-category-tees,.mens-category-hoodies,.mens-category-shorts,.gear-category-bags,.gear-category-equipment,.gear-category-watches{height:210px}.sale-women .content{width:50%;left:20px;bottom:20px}.sale-20-off .title{font-size:4.4rem}.sale-20-off .info{font-size:1.8rem}.sale-20-off,.sale-free-shipping,.sale-womens-t-shirts{height:205px}.sale-free-shipping .title{font-size:2.5rem}.sale-free-shipping .info{font-size:1.6rem}.sale-womens-t-shirts .title{font-size:2rem;margin-bottom:5px}.sale-womens-t-shirts .info{font-size:1.6rem;margin-bottom:5px}.home-eco .content{width:70%;top:45px;right:45px}.gear-equipment .content,.new-eco .content{left:20px;bottom:20px;width:60%}.new-eco .content{width:70%}.training-erin .content{width:73%;top:16px;bottom:16px;right:16px}.training-erin .info{font-size:1.6rem;display:block;padding:0 10%}.training-on-demand,.training-videos{height:208px}.home-pants{height:664px}.home-pants .title{font-size:44px !important;font-size:4.4rem !important;line-height:1.2}.collection-eco .content,.collection-performance .content{width:60%;top:16px;bottom:16px;left:50%;margin-left:-30%}.collection-eco .title,.collection-performance .title{font-size:4rem}.collection-eco .info,.collection-performance .info{font-size:2.2rem;display:block;padding:0 10%}.collection-erin{height:164px}.collection-erin .content{width:70%}.collection-erin .image{width:30%}.collection-erin .title{font-size:4rem}.collection-erin .info{font-size:2.2rem}.content-heading{position:relative}.content-heading:before{content:'';display:block;height:1px;width:100%;background:-moz-radial-gradient(center, ellipse cover, #fff 25%, #cecece 100%);background:-webkit-gradient(radial, center center, 0, center center, 100%, color-stop(25%, #fff), color-stop(100%, #cecece));background:-webkit-radial-gradient(center, ellipse cover, #fff 25%, #cecece 100%);background:-ms-radial-gradient(center, ellipse cover, #fff 25%, #cecece 100%);background:radial-gradient(ellipse at center, #fff 25%, #cecece 100%);position:absolute;top:50%;z-index:0}.content-heading .title,.content-heading .info{position:relative;z-index:1}.content-heading .title{font-size:3.8rem}.content-heading .info{font-size:1.8rem}.cms-content-important{font-size:2.2rem;font-weight:300;padding:20px;margin:0 0 35px -20px}.cms-content table{margin:40px 0 0}.cms-content ul li{margin-bottom:15px}.cms-content .block .block-content:before,.cms-content .block .block-content:after{content:"";display:table}.cms-content .block .block-content:after{clear:both}.cms-content .block .box{width:48%;margin-bottom:40px}.cms-content .block .box:nth-child(1){float:left;clear:left}.cms-content .block .box:nth-child(2){float:right}.cms-content .block .box:nth-child(2)+*{clear:both}.cms-content .block .box:nth-last-child(1),.cms-content .block .box:nth-last-child(2){margin-bottom:0}.privacy-policy-content{box-sizing:border-box;width:77.7%;float:right;padding-left:2%}.privacy-policy .block-collapsible-nav{box-sizing:border-box;width:22.3%;float:left}}


`;

export default globalStyle;
