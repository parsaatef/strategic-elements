
(function() {
    var menuEl = document.getElementById('ml-menu'),
        mlmenu = new MLMenu(menuEl, {
            // breadcrumbsCtrl : true, // show breadcrumbs
            // initialBreadcrumb : 'all', // initial breadcrumb text
            backCtrl : true, // show back button
            direction : 'l2r',// direction
            // itemsDelayInterval : 60, // delay between each menu item sliding animation
        });  

    // mobile menu toggle
    var openMenuCtrl = document.querySelector('.action--open'),
        closeMenuCtrl = document.querySelector('.action--close');

    openMenuCtrl.addEventListener('click', openMenu);
    closeMenuCtrl.addEventListener('click', closeMenu);

    function openMenu() {
        classie.add(menuEl, 'menu--open');
        closeMenuCtrl.focus();
    }

    function closeMenu() {
        classie.remove(menuEl, 'menu--open');
        openMenuCtrl.focus();
    }
})();