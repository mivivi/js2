jQuery(document).ready(function($) {

    $('.tab__content').hide();
    $('.tab__content:first').show();
    $('.tabs li:first').addClass('active');

    $('.tabs li').click(function(event) {
        $('.tabs li').removeClass('active');
        //берем элемент, на который кликнули
        $(this).addClass('active');
        //скрываем контент таба при клике
        $('.tab__content').hide();


        //записываем значение атрибутов href
        var selectTab = $(this).find('a').attr('href');
        //вешаем метод исчезновения и появления контента
        $(selectTab).fadeIn();
    });

});