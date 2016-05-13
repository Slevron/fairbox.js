function Action_popup(type, class_object){
    this.type = type;
    this.class  = class_object;
    this.switch_action(this.type, this.class);
}
Action_popup.prototype.switch_action = function(type, class_object){
    switch (type) {
        case 'margin':
            this.add_margin(class_object);
            break;
        case 'resize':
            this.resize_popup(class_object); 
            break;
        case 'add'   :
            this.add_class(class_object); 
            break;
        case 'scroll':
            this.save_scroll(class_object);
            break;
    } 
};
Action_popup.prototype.save_scroll = function(class_object){
    oldScroll = $(class_object).scrollTop();
    $(class_object).scrollTop(0);
};
Action_popup.prototype.add_class = function(class_object){
    $(html).addClass(class_object);
};
Action_popup.prototype.resize_popup = function(class_object){
    this.height = $(window).height();
    $('.'+class_object).css('height', this.height);
};

function Create_object(type, class_object, source, url){
    this.type   = type;
    this.class  = class_object;
    this.src    = source;
    this.url    = url;
    this.object = null;
    this.switchType(this.type, this.class, this.src, this.url);

}
Create_object.prototype.switchType = function(type, class_object, source, url){
    var that = this;
    if(source === null){
        if(url === null){
            this.createDiv(type, class_object);
        }else{
            this.createMedia(type, class_object, url);
            that.init_pos(class_object,{'left': 0, 'right': 0});
        }
    }else{
        this.createImage(type, class_object, source);
        that.init_pos(class_object,{'left': 0, 'right': 0});
    } 
};
Create_object.prototype.createDiv = function(type, class_object){ 
    if(class_object === class_container_nav){
        this.height = $(window).height() - 100;   
    }else{
        this.height = $(window).height();  
    }   
    this.object = $(type, {  
        class: class_object,
        height: this.height
    });
    switch (class_object) {
        case class_container:
            this.object.appendTo('body');
            break;
        case class_container_preview:
            this.object.appendTo('.'+class_container_nav);
            break;    
        default:
            this.object.appendTo('.'+class_container); 
    } 
};
Create_object.prototype.createImage = function(type, class_object, source){
    this.object = $(type, {
        id: id_media_image,
        class: class_object,
        src: source
    });
    this.object.appendTo('.'+class_container_media);
};
Create_object.prototype.createMedia = function(type, class_object, url){
    this.object = $(type, {  
        class: class_object,
        src: url,
        frameborder: 0,
        width: $(window).width(),
        height: $(window).height()
    }); 
    this.object.appendTo('.'+class_container_media); 
};
Create_object.prototype.init_pos = function(class_object, direction){
    var that = this;
    setTimeout(function () {
        $(that.object).css(direction);
    }, 100);
};


function Create_icon(name, type, class_object){
    // <i class="fa fa-times"></i>
    this.name   = name;
    this.type   = type;
    this.class  = class_object;
    this.object = null;
    this.switch_icon(this.name, this.type, this.class);
}
Create_icon.prototype.switch_icon = function(name, type, class_object){
    switch (name) {
        case 'close':
            this.init_icon(name, type, class_object);
            break;
        case 'direction-left':
            this.init_icon(name, type, class_object);
            break;
        case 'direction-right':
            this.init_icon(name, type, class_object);
            break;
    } 
};
Create_icon.prototype.init_icon = function(name, type, class_object){
    this.object = $(type, {
        id: '#'+name,
        class: class_object,
    }); 
    this.object.appendTo('.'+class_container_nav);
};
Create_icon.prototype.close_icon = function(){
    $('.'+class_container).remove();
    $(html).removeClass(class_body);
    $(window).scrollTop(oldScroll);
};
Create_icon.prototype.arrow_icon = function(name, element){
    var that = this;   
    var nbElements = 11;
    var currentIndex = Element.index() % nbElements;
    var previousIndex = Element.prev().index() % nbElements;
    if(name === 'direction-left'){
        if(Element.index() > 0){
            Element = element || Element.prev();
            that.arrow_action(Element);
            that.switchPreview(previousIndex,'+');                     
        }
    }else{
        if(Element.index() < nombre_media - 1){
            Element = element || Element.next();
            that.arrow_action(Element); 
            that.switchPreview(currentIndex,'-');                   
        }
    }
};
Create_icon.prototype.arrow_action = function(element){ 
    $('.showbox_container').empty();
    if(element.data('youtube')){
            source    = element.find('img').data('youtube') || element.data('youtube');
            showbox_media   = new Create_object('<iframe>', class_media ,null ,urlYoutube+source+'?autoplay=1');
    }else{
            source    = element.find('img').attr('src') || element.attr('src');
            showbox_media   = new Create_object('<img>', class_media ,source ,null); 
    }
    Element = element;
};
Create_icon.prototype.switchPreview = function(condition,direction){
    $('.preview_image').removeClass('active');
    Element.addClass('active'); 
    $('.showbox_second_preview').animate( { scrollLeft: Element.position().left }, 1000);
};

(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['jquery'], factory);
    } else if (typeof exports === 'object') {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
        // like Node.
        module.exports = factory(require('jquery'));
    } else {
        // Browser globals (root is window)
        root.Fairbox = factory(root.jQuery);
    }
}(this, function ($) {
function Fairbox(){
    var that = this;
    $('img[data-fairbox]').click(function(){
        if($(this).find('[data-fairbox!=""]')){
            that.initPopup($(this));
        }
    });
}
Fairbox.prototype.option = function(option) {
    this.disablePreview = option.disablePreview;
    this.disableSlider = option.disableSlider;
};
Fairbox.prototype.initPopup = function(element){
    Element = element;
    nombre_media = $(class_media_image).length;
    this.init_element(element, this.disablePreview);
    this.init_action();
    this.init_icon(this.disableSlider); 
};
Fairbox.prototype.init_element = function(element, condition){
    var showbox_container       = new Create_object('<div>',class_container,null,null);
    var showbox_container_nav   = new Create_object('<div>',class_container_nav,null,null);    
    var showbox_container_media = new Create_object('<div>',class_container_media,null,null);
    if(condition !== true){
        var showbox_container_preview = new Create_object('<div>',class_container_preview,null,null);
    }
    var showbox_second_preview  = new Preview_object('<div>', class_second_preview, null, class_container_preview);
    if(element.data('youtube')){
            source    = element.find('img').data('youtube') || element.data('youtube');
            showbox_media   = new Create_object('<iframe>', class_media ,null ,urlYoutube+source+'?autoplay=1');
    }else{
            source    = element.find('img').attr('src') || element.attr('src');
            showbox_media   = new Create_object('<img>', class_media ,source ,null); 
    }
    $('img[data-fairbox]').each(function() {
        var imgsrc          = $(this).attr("src");
        var data            = $(this).data("youtube") ;
        var id_preview;
        if(data){
            id_preview = 'video';
        }else{
            id_preview = 'image';
        }
        showbox_preview  = new Preview_object('<img>', 'preview_image  '+id_preview, imgsrc, class_second_preview , data);    
        showbox_preview.addActive(showbox_media);
    }); 
    $('.preview_image').click(function(){
        if($(this).index() !== Element.index()){
            if($(this).index() > Element.index()){
                showbox_right.arrow_icon('direction-right',$(this));
            }else{
                showbox_left.arrow_icon('direction-left',$(this));
            }
        }
    });
    showbox_second_preview.addWidth();
};
Fairbox.prototype.init_icon = function(condition){
    showbox_close           = new Create_icon('close','<i>',class_icon_close);
    if(condition !== true){
        showbox_left            = new Create_icon('direction-left','<i>',class_icon_left);
        showbox_right           = new Create_icon('direction-right','<i>',class_icon_right);
    }
    this.init_input(showbox_close, showbox_right, showbox_left,'close','direction-right','direction-left');
};
Fairbox.prototype.init_action = function(){
    var showbox_scroll          = new Action_popup('scroll', window);
    var showbox_add             = new Action_popup('add', class_body); 
    window.onresize = function(){
        var showbox_resize      = new Action_popup('resize', class_container);
        var showbox_nav_resize  = new Action_popup('resize', class_container_nav);
    }; 
};
Fairbox.prototype.init_input = function(close,right,left,class_close,class_right,class_left){  
    multiplicateur = 0;
    $('.'+class_close).click(function(event) {
        close.close_icon();
    });
    $('.'+class_right).click(function(event) {
        right.arrow_icon(class_right);
    });
    $('.'+class_left).click(function(event) {
        left.arrow_icon(class_left);
    });
    $(window).keydown(function( event ) {
        if ( event.which == 27 ) {
            close.close_icon();
        }
        if ( event.which == 39 ) {
            right.arrow_icon(class_right);
        }
        if ( event.which == 37 ) {
            left.arrow_icon(class_left);
        }
    });
    this.mouseMove(window);
};
Fairbox.prototype.mouseMove = function(object){
    var timer;
    object.addEventListener("mousemove",function(){
        $('.'+class_container_nav).css('opacity',1);
        clearTimeout(timer);
        timer=setTimeout(function(){$('.'+class_container_nav).css('opacity',0);},5000);
    });
};
FairBox = new Fairbox()
return FairBox;
}));

function Preview_object(type, class_object, source, container, alt){
    this.type   = type;
    this.class  = class_object;
    this.src    = source;
    this.alt    = alt;
    this.container = container;
    this.object = null;
    this.createImage(this.type, this.class, this.src, this.container, this.alt);
}
Preview_object.prototype.createImage = function(type, class_object, source, container, youtube){
    this.object = $(type, {
        id: id_media_image,
        class: class_object,
        src: source,
        data: {'youtube': youtube}
    });
    this.object.appendTo('.'+container);
};
Preview_object.prototype.addWidth = function(){
    $(this.object).css('width',$(this.object).parent().width());
};
Preview_object.prototype.addActive = function(media){
    if($(media).attr('src') === $(this.object).attr('src')){
        $(this.object).addClass('active');
    }
};
var html = 'html,body';
var class_container             = 'showbox';
var class_container_nav         = 'showbox_container_nav';
var class_container_preview     = 'showbox_container_preview';
var class_second_preview        = 'showbox_second_preview';
var class_container_media       = 'showbox_container';
var class_media                 = 'showbox_media';
var class_icon_close            = 'showbox_icon close fa fa-times';
var class_icon_left             = 'showbox_icon direction-left fa fa-chevron-left';
var class_icon_right            = 'showbox_icon direction-right fa fa-chevron-right';
var class_body                  = 'showbox_body';
var id_media_image              = 'image';
var class_media_image           = 'img[data-fairbox]';
var urlYoutube                  = 'https://www.youtube.com/embed/';
var oldScroll,source,sourceImage,showbox_margin,nombre_media, showbox_media, Element, multiplicateur, showbox_preview, showbox_close, showbox_left, showbox_right;
var nombre_preview = 12;
var FairBox;



