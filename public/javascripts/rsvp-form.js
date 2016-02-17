$(function() {
  $('#rsvp-form').submit(function(event) {
    event.preventDefault();
    $('#rsvp-form p').removeClass('error');

    var errors = [];

    if($('#names').val() === '') {
      errors.push('names');
      $('#names').closest('p').addClass('error');
    }

    if($('input[name="coming"]:checked').length === 0) {
      errors.push('coming');
      $('input[name="coming"]').closest('p').addClass('error');
    }

    if(errors.length === 0) {
      $('#rsvp-submit').addClass('loading').attr('disabled', true);
      $('#rsvp-form').off('submit').submit();
    }
  });
});
