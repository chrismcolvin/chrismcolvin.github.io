document.addEventListener("DOMContentLoaded", function(){
    //get the menu
    const mainMenu = document.querySelector('nav.app-header-menu');

    //get the menu items
    const menuItems = mainMenu.childNodes;

    //loop through the menu items and replace the text
    menuItems.forEach(a => {
        //get the text
        itemText = a.outerText;

        //if the text is blank
        if(!itemText) {
            //do nothing
        } else {
            //remove the first three characters
            itemText = itemText.substring(3);
        }

        //and replace the text with the result
        a.innerHTML = itemText;
    });

    // Select the button
    const btn = document.querySelector('.btn-toggle');
    const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");

    // Listen for a click on the button 
    btn.addEventListener("click", function() {
        // If the OS is set to dark mode...
        if (prefersDarkScheme.matches) {
        // ...then apply the .light-theme class to override those styles
        document.body.classList.toggle("light-theme");
        // Otherwise...
        } else {
        // ...apply the .dark-theme class to override the default light styles
        document.body.classList.toggle("dark-theme");
        }
    });
});