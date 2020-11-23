document.addEventListener('DOMContentLoaded', function() {
    var sidenav = document.querySelectorAll('.sidenav');
    var modal = document.querySelectorAll('.modal');
    M.Sidenav.init(sidenav);
    M.Modal.init(modal);
  });