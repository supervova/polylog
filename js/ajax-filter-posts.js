jQuery(document).ready(function ($) {
  // $('.taguniq').click( function(event) { //По нажатию на кнопку
  $('.filter').on('change', function () {
    // При изменении формы

    // Prevent defualt action - opening tag page
    if (event.preventDefault) {
      event.preventDefault();
    } else {
      event.returnValue = false;
    }

    // Get tag slug from title attirbute

    const category = $(this).attr('title'); // Чтобы брать из этой же категории
    const sortValues = $('#country option:selected').val();
    const sortValues2 = $('#power option:selected').val();
    const sortValues3 = $('#date-after').val();
    var sortValues4 = $('#date-before').val();
    var sortValues4 = $('#date-before').val();

    var arrList = $('.metka:checkbox:checked')
      .map(function () {
        return $(this).attr('value');
      })
      .get();
    const tags = arrList.join(', '); // преобразовываем массив в строку с разделителем ' '

    // alert (tags);

    var arrList = $('.label:checkbox:checked')
      .map(function () {
        return $(this).attr('value');
      })
      .get();
    const labels = arrList.join(', ');

    $('.tagged-posts').fadeOut();

    data = {
      action: 'filter_posts',
      afp_nonce: afp_vars.afp_nonce,
      category,
      taxonomy: sortValues,
      taxonomy2: sortValues2,
      date: sortValues3,
      date2: sortValues4,
      tags,
      labels,
    };

    $.ajax({
      type: 'post',
      dataType: 'html',
      url: afp_vars.afp_ajax_url,
      data,
      success(data, textStatus, XMLHttpRequest) {
        $('.tagged-posts').html(data);
        $('.tagged-posts').fadeIn();
        // console.log( textStatus );
        // console.log( XMLHttpRequest );
      },
      error(MLHttpRequest, textStatus, errorThrown) {
        // console.log(MLHttpRequest);
        // console.log(textStatus);
        // console.log(errorThrown);
        $('.tagged-posts').html('No posts found');
        $('.tagged-posts').fadeIn();
      },
    });
  });

  $('#all').click(function (event) {
    // Получаем данные из различных атрибутов
    const selecetd_cat = $('#curcat').attr('title');

    $('.tagged-posts').fadeOut();

    data = {
      action: 'filter_posts',
      afp_nonce: afp_vars.afp_nonce,
      category: selecetd_cat, // Не передаем лишних параметров
    };

    $.ajax({
      type: 'post',
      dataType: 'html',
      url: afp_vars.afp_ajax_url,
      data,
      success(data, textStatus, XMLHttpRequest) {
        $('.tagged-posts').html(data);
        $('.tagged-posts').fadeIn();
        // console.log(textStatus);
        // console.log(XMLHttpRequest);
      },
      error(MLHttpRequest, textStatus, errorThrown) {
        // console.log(MLHttpRequest);
        // console.log(textStatus);
        // console.log(errorThrown);
        $('.tagged-posts').html('No posts found');
        $('.tagged-posts').fadeIn();
      },
    });
  });
});
