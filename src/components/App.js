import "styles/App.css";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Content from "./Content";

import URLParser from "../services/URLParser";

import About from "../views/pages/About";
import Settings from "../views/pages/Settings";
import AnalyticsPage from "../views/pages/AnalyticsPage.js";
/**
 * Container for the application
 */
export default class App {
    /**
     * Create the App and render it's children
     * @param {HTMLElement} rootElement - The root element for all components
     */
    constructor(rootElement) {
        this._root = rootElement;
        this.render();
        this.addEventListeners();
    }

    addEventListeners() {
        this.addClickEventListener();
        this.addHoverListener();
    }

    addClickEventListener() {
        var thisClass = this;
        document.addEventListener('click', function (event) {

            event.preventDefault();

            if (event.target.matches('.home')) {
                thisClass.gotoHomePage();
            } else if (event.target.matches('.info')) {
                thisClass.gotoAboutPage();
            } else if (event.target.matches('.cog')) {
                thisClass.gotoSettingsPage();
            }else if (event.target.matches('.chart-line')) {
                thisClass.gotoAnalytics();
            }


        }, false);
    }

    addHoverListener() {
        document.body.addEventListener('mouseover', function (event) {
            event.preventDefault();

            if (event.target.matches('.slice')) {
                console.log("it is a slice");
                const child = event.target;
                const parent = child.parentNode;
// The equivalent of parent.children.indexOf(child)
                const index = Array.prototype.indexOf.call(parent.children, child);
                child.setAttribute('original', child.getAttribute('fill'));
                child.setAttribute('fill', 'red');
                const legend = document.getElementsByTagNameNS("http://www.w3.org/2000/svg", "rect");
                //console.log(legend);
                legend[index].setAttribute('fill', 'red');


            } else if (event.target.parentElement.matches('.legend')) {
                const child = event.target.matches("text") ? event.target.previousSibling : event.target;
                const legend = document.getElementsByTagNameNS("http://www.w3.org/2000/svg", "rect");
                const slice_ = document.getElementsByClassName("slice");
                const index = Array.prototype.indexOf.call(legend, child);
                slice_[index].setAttribute('original', slice_[index].getAttribute('fill'));
                slice_[index].setAttribute('fill', 'red');
                child.setAttribute('fill', 'red');
            }
        }, false);
        document.body.addEventListener('mouseout', function (event) {
            event.preventDefault();
            if (event.target.matches('.slice')) {
                console.log("it is a slice");
                const child = event.target;
                const parent = child.parentNode;
// The equivalent of parent.children.indexOf(child)
                const index = Array.prototype.indexOf.call(parent.children, child);
                child.setAttribute('fill', child.getAttribute('original'));
                const legend = document.getElementsByTagNameNS("http://www.w3.org/2000/svg", "rect");
                legend[index].setAttribute('fill', child.getAttribute('original'));
            } else if (event.target.parentElement.matches('.legend')) {
                const child = event.target.matches("text") ? event.target.previousSibling : event.target;
                const legend = document.getElementsByTagNameNS("http://www.w3.org/2000/svg", "rect");

                const slice_ = document.getElementsByClassName("slice");
                const index = Array.prototype.indexOf.call(legend, child);
                slice_[index].setAttribute('fill', slice_[index].getAttribute('original'));
                child.setAttribute('fill', slice_[index].getAttribute('original'));
            }
        }, false);
    }


    /**
     * Assuming a SPA and no other pages .... didn't use the router as this is a simple app
     */

    /**
     * Render elements to the DOM
     */
    /**
     * Made the pageContainer a class variable instead of instantiating every single tme. reusing the components.
     *
     */
    render() {
        this._root.className = "app";

        this.sidebar = new Sidebar();

        this.pageContainer = document.createElement("div");
        this.pageContainer.className = "page";

        this.header = new Header();
        this.content = new Content();
        this.aboutPage = new About();
        this.settingsPage = new Settings();
        this.analyticsPage = new AnalyticsPage();
        this.pageContainer.appendChild(this.header.getElement());
        this.pageContainer.appendChild(this.content.getElement());

        this._root.appendChild(this.sidebar.getElement());
        this._root.appendChild(this.pageContainer);

    }

    /**
     * Created this method for navigating to About page
     */
    gotoAboutPage() {
        this.pageContainer.innerHTML = '';
        this.pageContainer.appendChild(this.aboutPage.getContainer());
    }

    /**
     * Created this page to go to homepage
     */
    gotoHomePage() {
        this.pageContainer.innerHTML = '';
        this.pageContainer.appendChild(this.header.getContainer());
        this.pageContainer.appendChild(this.content.getContainer());
    }

    /**
     * Similarly can be used to create a link to
     */
    gotoAnalytics() {
        this.pageContainer.innerHTML = '';
        this.pageContainer.appendChild(this.analyticsPage.getContainer());
    }

    gotoSettingsPage() {
        this.pageContainer.innerHTML = '';
        this.pageContainer.appendChild(this.settingsPage.getContainer());
    }
}
