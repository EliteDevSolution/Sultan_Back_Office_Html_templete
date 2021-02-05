$(document).ready(function() {
  
  var isEdit = false;

  $('.list-item').click(function() {
    $('.list-item').removeClass('active');
    $(this).addClass('active');
  });

  $('#checkbox').click(function() {
    if($(this).prop('checked')) {
      $('#category-name-container').removeClass('d-none');
    } else {
      $('#category-name-container').addClass('d-none');
    }
  });

  $('.alert').hide();
  $('.alert').removeClass('d-none');

  $('.category-edit').change(function() {
    $('.save').removeAttr('disabled');
    $('.cancel').removeAttr('disabled');
    $('.delete-btn').removeAttr('disabled');
  });

  function format() {
    $('input').val('');
    $('.save').attr('disabled', true);
    $('.cancel').attr('disabled', true);
    $('#category-edit-title').text('Create category');
    $('.delete-btn').addClass('d-none');
    isEdit = false;
  }

  $('.save').click(function() {
    if(isEdit) {
      $('.alert').text('Category updated successfully');
    } else {
      $('.alert').text('Category added successfully');
    }
    $('.alert').fadeIn();
    format();
    setTimeout(function() {
      $('.alert').fadeOut();
    }, 3000);
  });

  $('body').on('click', '.delete-row', function() {
    $(this).parent().parent().remove();
  });

  var htmlStr = `
    <div class="list-item " data-id="15">
      <div>
        <div class="text-muted js-handle">
          <i class="i-con i-con-menu"><i></i></i>
        </div>
      </div>
      <div class="flex pr-0 col-8">
        <input type="text" class="form-control" placeholder="e.g. Cheese">
      </div>
      <div class="no-wrap">
        <div class="input-group">
          <div class="input-group-prepend">
            <span class="input-group-text">L£</span>
          </div>
          <input type="text" class="number-format form-control">
        </div>
      </div>
      <div class="pl-0">
        <a class="delete-row text-danger i-con-h-a">
          <i class="i-con i-con-trash"><i></i></i>
        </a>
      </div>
    </div>
    `;
  
  $('.add-row').click(function() {
    $('.list-row').append(htmlStr);
  });

  

  $('.edit').click(function() {
    isEdit = true;
    $('#category-edit-title').text('Edit category');
    var parent_catname  = $(this).parent().parent().parent().parent().find('.grand-cat').text();
    if(parent_catname == ''){
      $('#name').val('Category Name');
      $('#checkbox').prop('checked', true);
      $('#sub-category').val('');
      $('#category-name-container').removeClass('d-none');
    }else{
      $('#name').val(parent_catname);
      $('#checkbox').prop('checked', false);
      $('#sub-category').val('');
      $('#category-name-container').addClass('d-none');
    }
    
    $('.save').attr('disabled', true);
    $('.cancel').attr('disabled', true);
    $('.delete-btn').attr('disabled', true);
    $('.delete-btn').removeClass('d-none');
  });

  $('.leave').click(function() {
    format();
  });

  $('.parent-cat').click(function(){
    location.href = 'products.category.sub.html';
  });

  $('.delete').click(function() {
    var grand_catname  = $(this).parent().parent().parent().parent().find('.grand-cat').text();
    var parent_catname  = $(this).parent().parent().parent().parent().find('.parent-cat').text();
    $('#delete-modal').modal('show');
    if(parent_catname == ''){
      $('#category-name').html(grand_catname);
      $('.btn-modal-delete').click(function() {
        $('.alert').text('Sub-category has been deleted successfully');
        $('.alert').fadeIn();
        setTimeout(function() {
          $('.alert').fadeOut();
        }, 3000);
        format();
      });
    }else{
      $('#category-name').html(parent_catname);
      $('.btn-modal-delete').click(function() {
        $('.alert').text('Category has been deleted successfully');
        $('.alert').fadeIn();
        setTimeout(function() {
          $('.alert').fadeOut();
        }, 3000);
        format();
      });
    }
  });
});