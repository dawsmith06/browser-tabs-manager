const TabsManager  = (function(){
    return { 
        setup(){
            this.tabs = this.getTabs();
            this.tab  = btoa(new Date());
            this.addTab();
            window.addEventListener('beforeunload',   () =>{ this.removeTab() });
            window.addEventListener('focus',          () =>{ this.focusTab() });
            window.addEventListener('blur',           () =>{ this.unfocusTab() });
        },

        getTabs(){
            return  JSON.parse(localStorage.getItem('TabsManager') || JSON.stringify({open : []}));
        },

        getTab(){
            let index = this.getTabs().open.findIndex((t)=> t.id == this.tab);
            return this.getTabs().open[index];
        },

        addTab(){
            this.tabs.open.forEach((t) => t.lastFocus = false);
            this.tabs.open.push({
                id        : this.tab,
                focus     : true,
                lastFocus : true,
                href      : location.href,
            });
           this.update();
        },

        removeTab(){
            let index = this.tabs.open.findIndex((t)=> t.id == this.tab);
            this.tabs.open.splice(index,1);
            this.update();
        },

        focusTab(){
            this.tabs = this.getTabs();
            this.tabs.open.forEach((t) => t.lastFocus = false);
            let index = this.tabs.open.findIndex((t)=> t.id == this.tab);
            this.tabs.open[index].focus     = true;
            this.tabs.open[index].lastFocus = true;
            this.update();
        },

        unfocusTab(){
            this.tabs = this.getTabs();
            let index = this.tabs.open.findIndex((t)=> t.id == this.tab);
            this.tabs.open[index].focus = false;
            this.update();
        },

        update(){
            localStorage.setItem('TabsManager',JSON.stringify(this.tabs));
        },

        clearAll(){
            this.tabs = {open : []};
            this.update();
        }
    };
}());
TabsManager.setup();

module.exports = TabsManager;
