// Our Javascript will go here.



function getAdData(){
  
  test_data = {
    "ads": [
      {
        "matterType": 1,
        "img": {
          "url": "../assets/img/timg.jpg"
        },
        "showBanner": 0,
        "isZoom": 0,
        "timeLength": 5
      },
      {
        
        "matterType": 3,
        "img": {
          "url": "../assets/img/timg2.jpg",
          "width": 1500,
          "height": 1558
        },
        "video": {
          "url": "../assets/mp4/mv1.mp4"
        },
        "showBanner": 0,
        "isZoom": 0,
        "timeLength": 5
      },
      {
        "matterType": 2,
        "img": {
          "url": "http://img30.360buyimg.com/test/s150x250_jfs/t1/5/8/11018/1209787/5c6cbe9eE5eb1e2e4/3577d2b8502edf87.png",
          "width": 1500,
          "height": 1558
        },
        "video": {
          "url": "../assets/mp4/mv2.mp4"
        },
        "showBanner": 0,
        "isZoom": 0,
        "timeLength": 5
      },
      {
        "matterType": 7,
        "H5coupon": {
          "url": "http://172.25.64.84/offline/h5/bigScreen/index.html",
          "coupons5": [{
            "couponType": 1,
            "title": "店铺介绍",
            "store": "店铺名称",
            "imageUrl": "http://img20.360buyimg.com/img/jfs/t1/51982/36/777/860991/5ce748c2Ebfd3b276/be1ddad7ebd34b88.png",
          }],
          "coupons16": [{
            "couponType": 0,
            "title": "店铺介绍",
            "store": "店铺名称",
            "imageUrl": "http://img20.360buyimg.com/img/jfs/t1/51982/36/777/860991/5ce748c2Ebfd3b276/be1ddad7ebd34b88.png",
          
          }],
          "coupons3": [],
          "couponsOther": [{
            "couponType": 1,
            "title": "店铺介绍",
            "store": "店铺名称",
            "imageUrl": "http://img20.360buyimg.com/img/jfs/t1/51982/36/777/860991/5ce748c2Ebfd3b276/be1ddad7ebd34b88.png",
      
          },
          {
            "couponType": 1,
            "title": "店铺介绍",
            "store": "店铺名称",
            "imageUrl": "http://img20.360buyimg.com/img/jfs/t1/51982/36/777/860991/5ce748c2Ebfd3b276/be1ddad7ebd34b88.png",
  
          }],
          "qr": "http://img30.360buyimg.com/test/jfs/t1/6/32/12654/75612/5cdb8762E8dc574aa/808d86861e09d94e.jpg"
        },
        "timeLength": 15
      }
    ],
    
   }
}

/**
 *@method 初始化函数
 */
function init(){
    getAdData()
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / document.documentElement.clientHeight   , 0.1, 1000);
    //移动摄像头的位置，防止重叠
    camera.position.z = 80;
    camera.position.y = 20;
    controls = new THREE.OrbitControls(camera);
    renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha:true,
        precision:"highp"
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, document.documentElement.clientHeight - 5);
    renderer.sortObjects = false;
    myCanvas = renderer.domElement
    document.body.appendChild(renderer.domElement);

    //初始化广告
    ADList = [] //广告对象
    ADindex = 0
    beClick = true
}

/**
 * @method 广告模型渲染
 */
function createShapes(){
  createMachine()
  createAD()
}

/**
 * @method 机器模型渲染
 */
function createMachine(){
    let MachineControl = new THREE.Group();
    let Machine = new THREE.Object3D();
    MachineControl = Machine

    var body = new THREE.BoxGeometry(60, 80, 5);
    var material =  new THREE.MeshBasicMaterial( {color: 0x00000} );
    body = new THREE.Mesh(body, material);

    // 左侧线
    var material = new THREE.LineBasicMaterial({
        color: 0xffffff
    });
    var geometry = new THREE.Geometry();
    geometry.vertices.push(new THREE.Vector3(0, 0, 0));
    geometry.vertices.push(new THREE.Vector3(3, 0, 0));
    var line = new THREE.Line( geometry, material );
    line.position.x = -25;
    line.position.y = 13.4;
    line.position.z = 2.6;

    //左侧圆环
    var geometry =  new THREE.TorusBufferGeometry( 1, 0.2, 2, 100 );
    var material = new THREE.MeshBasicMaterial( { color: 0xffffff } );
    var torus = new THREE.Mesh( geometry, material );
    torus.position.z = 2.6;
    torus.position.x = -23.5;
    torus.position.y = 15.5;

    MachineControl.add(torus) //添加圆环
    MachineControl.add(line)  //加入线
    MachineControl.add(body)  //加入主机

    clickObjects=[];  //chick obj
    clickObjects.push(body)
    scene.add(MachineControl);
}

/**
 * @method 视频材质模板
 * @param {*} mysrc 视频地址
 * @returns
 */
function videoTemplate(mysrc){
    var materials = [];
    for (var i = 0; i < 6; ++i) {
        if(i == 4){
            let video = document.createElement('video')
            video.loop = true
            video.setAttribute("src", mysrc);
            video.setAttribute("crossorigin", "anonymous");
            video.setAttribute("loop", true);
            video.setAttribute("webkit-playsinline", "webkit-playsinline");

            video.addEventListener('canplaythrough',function(){
                video.play();
            });
            var texture = new THREE.VideoTexture( video );
            texture.minFilter = THREE.LinearFilter;
            texture.magFilter = THREE.LinearFilter;
            texture.format = THREE.RGBFormat;
            var material = new THREE.MeshBasicMaterial( { map: texture } );
            materials.push(material)
        }else{
            materials.push(new THREE.MeshBasicMaterial({ color: 0x00ff00 }));
        }
    }
    return materials
}

/**
 * @method 图片材质模板
 * @param {*} _src
 * @returns
 */
function ImageTemplate(_src){
    var texture = new THREE.TextureLoader().load(_src);
    texture.magFilter = THREE.NearestFilter
    texture.minFilter = THREE.NearestFilter
    var maxAnisotropy = renderer.capabilities.getMaxAnisotropy();
    texture.anisotropy = maxAnisotropy;
    var material = new THREE.MeshBasicMaterial( { map: texture,transparent:true} );
    return material
}

/**
 * @method 初始广告的显示顺序，以及偏移。
 * @param {*} AD
 * @param {*} i
 */
function adPositionInit(AD,i){  //set init
    showimg = 0
    AD.rotation.y = i == showimg ? 0 : -0.02;
    AD.position.z = i == showimg ? 2.6 : 1.4
    AD.position.x = 5.5;
    ADList.push(AD)
    scene.add(AD);
}

/**
 * @method 增加附件优惠卷
 * @param {*} data
 * @returns   增加后的广告播放列表
 */
function nearPreferential(data){
    var _list = data.showingList
    var obj = {
        type:4,
        data:data.playCoupons
    }
    _list.push(obj)
    return _list
}

/**
 * @method 对原始广告进行填充
 * @param {*} adList  未填充的广告list
 * @returns 填充后的广告list
 */
function replenishCouonAd(adList){
    var feed = adList.couponsOther
    var needFeedList = ['coupons3','coupons5','coupons16']
    var feedNum
    for(var j in needFeedList){
            feedNum = 2 - adList[needFeedList[j]].length
            if(feedNum == 1){
              adList[needFeedList[j]].push(adList[needFeedList[j]][0]);
            }else if(feedNum == 2){
              adList[needFeedList[j]].push(feed.pop())
              adList[needFeedList[j]].push(feed.pop())
              adList[needFeedList[j]].title = "生活服务"
            }
      }
    return adList
}


/**
 * @method 转换折扣优惠文字
 * @param {*} coupon
 * @returns
 */
function getCouponText(coupon){
  return "优惠金额"
  var text
  switch(coupon.couponType){
    case 0: //折扣
      text = `满${coupon.consume}打${coupon.discount}折` 
      break
    case 1:  //满减
      text = `满${coupon.consume}减${coupon.discount}` 
      break
    case 2: //自定义
      break
  }
  return text
}

/**
 * @method 创建优惠卷的数据
 * @param {*} _list 优惠卷列表
 */
function createCouponData(Coupon,y,x){
  var group = new THREE.Group();
  // ico
  var imgTexture = ImageTemplate("../assets/3km/storeIcon.png")
  var storeIcon = new THREE.Mesh(new THREE.CubeGeometry(0.8, 0.8, 0.01), imgTexture);
  storeIcon.position.x = -19 + x
  storeIcon.position.y = -3.8 + y
  storeIcon.position.z = 0.02
  
  //img
  var imgTexture = ImageTemplate(Coupon.imageUrl)
  var couponImg = new THREE.Mesh(new THREE.CubeGeometry(5.2, 5.2, 0.01), imgTexture);
  couponImg.position.x = -16.7 + x
  couponImg.position.y = -7.8 + y
  couponImg.position.z = 0.03

  //storeName
  var material = textTemplate({
      text:Coupon.store,
      font:"90px Arial",
  })
  var storeName = new THREE.Mesh(new THREE.CubeGeometry(5.2, 5.2, 0.01), material);
  storeName.position.x = -15 + x
  storeName.position.y = -5.9 + y
  storeName.position.z = 0.02
  group.add(storeName)

  //title
  var material = textTemplate({
      text:Coupon.title,
      font:"Bold 80px Arial",
      width:400,
      height:400
    })
  var couponTitle = new THREE.Mesh(new THREE.CubeGeometry(5.2, 5.2, 0.01), material);
  couponTitle.position.x = -11.5 + x + 2
  couponTitle.position.y = -7.8 + y
  couponTitle.position.z = 0.03

  //font bg
  var material = new THREE.MeshBasicMaterial( { color:"red"} );
  var fontBg = new THREE.Mesh(new THREE.CubeGeometry(6.8, 1.8, 0.01), material);
  fontBg.position.x = -10.5 + x + 2
  fontBg.position.y = -9  + y
  fontBg.position.z = 0.03

  //text
  var text = getCouponText(Coupon)
  var material = textTemplate({
    text:text,
    font:"Bold 90px Arial",
    width:400,
    height:400,
    style:'white'
  })
  var couponText = new THREE.Mesh(new THREE.CubeGeometry(5.2, 5.2, 0.01), material);
  couponText.position.x = -10.8 + x + 2
  couponText.position.y = -11 + y
  couponText.position.z = 0.04

  group.add(storeIcon)
  group.add(couponImg)
  group.add(couponTitle)
  group.add(fontBg)
  group.add(couponText)
  return group
}

/**
 * @method 文字材质模板
 * @param {*} obj
 * @returns
 */
function textTemplate(obj){
  let canvas = document.createElement("canvas");
  canvas.width=obj.width||500;
  canvas.height=obj.height||500;
  x = obj.x || 20
  y = obj.y || 80
  let ctx = canvas.getContext("2d");
  ctx.font = obj.font;
  if('style' in obj){
    ctx.fillStyle =  obj.style
  }
  ctx.fillText(obj.text, x, y);  // text,x,y
  let texture = new THREE.Texture(canvas);
  texture.needsUpdate = true;
  texture.wrapS = THREE.LinearFilter
  texture.wrapT = THREE.LinearFilter
  var material = new THREE.MeshBasicMaterial({
    map: texture,
    transparent:true,
 })
  return material;
}

/**
 * @method 优惠卷头部显示
 * @param {*} _title
 * @param {*} y
 * @returns
 */
function couponAdTitle(_title,y){
    var group = new THREE.Group();
    var imgSrc
    switch(_title){
        case "美食":
            imgSrc = "../assets/3km/foodbg.png" 
            icoImg = "../assets/3km/foodicon.png"
            break
        case "生活服务":
            imgSrc = "../assets/3km/servicebg.png"
            icoImg = "../assets/3km/serviceicon.png"
            break
        case "亲子服务":
            imgSrc = "../assets/3km/childbg.png" 
            icoImg = "../assets/3km/childicon.png"
            break
    }
    var imgTexture = ImageTemplate(imgSrc)
    var imgBlock = new THREE.Mesh(new THREE.CubeGeometry(42, 5, 0.01), imgTexture);
    imgBlock.position.y = 0 + y
    imgBlock.position.z = 0.01
    var icoTexture = ImageTemplate(icoImg)
    
    //ico
    var icoBlock = new THREE.Mesh(new THREE.CubeGeometry(8, 6, 0.01), icoTexture);
    icoBlock.position.z = 0.02
    icoBlock.position.x = 12 
    icoBlock.position.y = 0.5 + y

    //store bg
    var material = new THREE.MeshBasicMaterial();
    var Imgbg = new THREE.Mesh(new THREE.CubeGeometry(42, 12, 0.01), material);
    Imgbg.position.y = -8.5 + y
    Imgbg.position.z = 0.01

    var material = textTemplate({
        text:_title,
        font:"Bold 200px Arial",
        width:800,
        height:800,
        x:10,
        y:360
      })
    var couponTitle = new THREE.Mesh(new THREE.CubeGeometry(5.2, 5.2, 0.01), material);
    couponTitle.position.x = -17
    couponTitle.position.y = -1 + y
    couponTitle.position.z = 0.02

    group.add(Imgbg)
    group.add(imgBlock)
    group.add(icoBlock)
    group.add(couponTitle)

    return group
}

/**
 * @method 渲染优惠卷模板
 * @param {*} adList 优惠卷列表
 */
function couponRender(adList){
    var group = new THREE.Group();
    var _title,y=15.5,_y = -23;
    var needFeedList = ['coupons3','coupons5','coupons16']
    for(var j in needFeedList){
        if(adList[needFeedList[j]].length == 0) continue;    
        var _list = adList[needFeedList[j]]             
        switch(needFeedList[j]){
          case "coupons3":
            _title = "生活服务"
            var titleBlock = couponAdTitle(_title,y)
            var childGroup = new THREE.Group();
            var _x = 0
            for(var i=0; i<_list.length;i++){
              var couponBlock = createCouponData(_list[i],_y,_x)
              childGroup.add(couponBlock)
              _x = _x + 20
            }
            group.add(titleBlock)
            group.add(childGroup)
            break
          case "coupons5":
            _title = "美食"
            var titleBlock = couponAdTitle(_title,y)
            var childGroup = new THREE.Group();
            var _x = 0
            for(var i=0; i<_list.length;i++){
              var couponBlock = createCouponData(_list[i],_y,_x)
              childGroup.add(couponBlock)
              _x = _x + 20
            }
            group.add(titleBlock)
            group.add(childGroup)
            break
          case "coupons16":
            _title = "亲子服务"
            var titleBlock = couponAdTitle(_title,y)
            var childGroup = new THREE.Group();
            var _x = 0
            for(var i=0; i<_list.length;i++){
              var couponBlock = createCouponData(_list[i],_y,_x)
              childGroup.add(couponBlock)
              _x = _x + 20
            }
            group.add(titleBlock)
            group.add(childGroup)
            break
        }
        _y = _y + 18.5
        y = y - 18.5
    }
    return group
}

/**
 * @method 创建广告
 */
function createAD(){
    var _list = test_data.ads
    for (var j in _list){
        switch(_list[j].matterType){
            case 1: // 图片
                var imgTexture = ImageTemplate(_list[j].img.url)
                var imgBlock = new THREE.Mesh(new THREE.CubeGeometry(45, 75, 0.01), imgTexture);
                adPositionInit(imgBlock,j)
                break
            case 2:  //视频
                var material  = videoTemplate(_list[j].video.url)
                var AD = new THREE.Mesh(new THREE.CubeGeometry(45, 75, 0.01), material);
                adPositionInit(AD,j)
                break
            case 3:  //视频加图片
                var group = new THREE.Group();
                var videoTexture  = videoTemplate(_list[j].video.url)
                var VideoBlock = new THREE.Mesh(new THREE.CubeGeometry(45, 25, 0.01), videoTexture);
                VideoBlock.position.y = 25;
                var imgTexture = ImageTemplate(_list[j].img.url)
                var imgBlock = new THREE.Mesh(new THREE.CubeGeometry(45, 50, 0.01), imgTexture);
                imgBlock.position.y = -12.5;
                group.add(VideoBlock)
                group.add(imgBlock)
                adPositionInit(group,j)
                break
            case 7: // 优惠卷广告
                //背景框
                var group = new THREE.Group();
                var bgTexture = ImageTemplate("../assets/3km/bg_new.jpg")
                var bgImg = new THREE.Mesh(new THREE.CubeGeometry(45, 75, 0.01), bgTexture);

                //二维码
                var QRTexture  = ImageTemplate("../assets/3km/qggQR.jpg")
                var QRcode = new THREE.Mesh(new THREE.CubeGeometry(7, 7, 0.01), QRTexture);
                QRcode.position.y = 27
                QRcode.position.x = 16.5
                QRcode.position.z = 0.01

                // 优惠卷信息
                var u_ad = replenishCouonAd(_list[j].H5coupon)
                var couponADBlock = couponRender(u_ad)
                couponADBlock.position.z = 0.01

                group.add(bgImg)
                group.add(QRcode)
                group.add(couponADBlock)
                adPositionInit(group,j)
                break
            case 4: //商品广告
                j -= 1 // 暂时没写的处理
                break
        }
    }
}

/**
 * @method 运行时函数
 */
function run(){
    init();
    createShapes();
    animate();
    initThreeClickEvent()
}

run();

/**
 * @method 选择播放的下一个广告
 */
function switchAD(){
    if(!beClick){return}
    beClick = false
    // if(ADindex)
    lastIndex = ADindex
    // lastIndex = ADindex == 0 ? ADList.length - 1: ADindex;
    ADindex += 1
    ADindex = ADindex %  ADList.length
    TweenMax.to(ADList[ADindex].rotation,1.5,{y:0,onComplete:function(){  //set init
        TweenMax.to(ADList[ADindex].position, 0.01, { z:2.6}); //回到标准位置
        TweenMax.to(ADList[lastIndex].position, 0.01, { z:1.4}); //退至位置
        TweenMax.to(ADList[lastIndex].rotation, 0.01, { y:-0.02}); //旋转轴
        beClick = true
    }})
    TweenMax.to(ADList[ADindex].position, 1, { z:2.7});
}

/**
 * @method 点击事件
 */
function initThreeClickEvent() {
    //点击射线
    var raycaster = new THREE.Raycaster();
    var mouse = new THREE.Vector2();
    myCanvas.addEventListener('mousedown', onDocumentMouseDown, false);
    function onDocumentMouseDown(event) {
        event.preventDefault();
        mouse.x = (event.clientX / renderer.domElement.clientWidth) * 2 - 1;
        mouse.y = -(event.clientY / renderer.domElement.clientHeight) * 2 + 1;
        raycaster.setFromCamera(mouse, camera);
        var intersects = raycaster.intersectObjects(clickObjects);
        if(intersects.length > 0) {
            switchAD()
        }
    }
}

/**
 *  @method 帧渲染
 */
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

