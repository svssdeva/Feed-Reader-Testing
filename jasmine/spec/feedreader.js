/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
     * a related set of tests. This suite is all about the RSS
     * feeds definitions, the allFeeds variable in our application.
     */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds instanceof Array).toBeTruthy();
            expect(allFeeds.length).not.toBe(0);

        });


        /*Write a test that circles through each feed 
         * in the allFeeds object and guarantees it has a URL characterized 
         * and that the URL isn't vacant.
         */
        function allFeedsURL(i) {
            var int = 1 + i;
            it('feed ' + int + ' has a URL', function() {
                expect(allFeeds[i].url).toBeDefined();
                expect(allFeeds[i].url.length).toBeGreaterThan(0);
            });
        }
        for (var i = 0; i < allFeeds.length; i++) {
            allFeedsURL(i);
        }


        /* Write a test that circles through each feed 
         * in the allFeeds object and guarantees it has a name characterized 
         * and that the name isn't vacant. 
         */
        it("have names", function() {
            allFeeds.forEach(function(feed) {
                expect(feed.name).toBeDefined();
                expect(typeof feed.name).toBe("string");
                expect(feed.name.length).not.toBe(0);
            });
        });
    });


    /*  Write another test suite named "The menu" */
    describe('The Menu', function() {

        let body = document.body;
        let menuIcon = document.querySelector(".menu-icon-link");
        /*  Write a test that guarantees the menu element is 
         * covered up as a matter of course. You'll need to dissect the HTML and 
         * the CSS to decide how we're playing out the 
         * concealing/appearing of the menu element. 
         */
        it('hidden by default', function() {
            expect(body.classList).toContain('menu-hidden');
        });

        /* Write a test that guarantees the menu changes 
         * perceivability when the menu icon is clicked. This test 
         * ought to have two desires: does the menu show when 
         * clicked and does it stow away when clicked once more. 
         */
        it('toggles when clicked', function() {
            menuIcon.click();
            expect(body.className).not.toContain("menu-hidden");
            menuIcon.click();
            expect(body.className).toContain("menu-hidden");
        });
    });

    /*  Write a new test suite named "Initial Entries" */
    describe('Initial Entries', function() {

        /*  Write a test that guarantees when the loadFeed 
         * function is called and finishes its work, there is in any event 
         * a solitary .entry element inside the .feed container. 
         * Remember, loadFeed() is asynchronous so this test will require 
         * the utilization of Jasmine's beforeEach and asynchronous done() function. 
         */
        beforeEach(function(done) {
            loadFeed(0, function() {
                done();
            });
        });


        // Load "loadFeed" function is called and completes it, and there
        // should at least 1 .entry element in the .feed contianer
        it("has at least 1 entry after loadFeed function is called", function(done) {
            let numEntries = document.querySelector(".feed").getElementsByClassName("entry").length;
            expect(numEntries).toBeGreaterThan(0);
            done();
        });

        // Make sure each (.feed .entry-link) element has valid link
        it("has a entry that has a link starting with 'http(s)://'", function(done) {
            let entries = document.querySelector(".feed").getElementsByClassName("entry-link");
            for (var i = 0; i < entries.length; i++) {
                expect(entries[i].href).toMatch(/^(http|https):\/\//);
            }
            done();
        });
    });

    /*  Write a new test suite named "New Feed Selection" */
    describe('New Feed Selection', function() {
        let firstRun;
        let secondRun;

        /* Write a test that guarantees when another feed is stacked 
         * by the loadFeed function that the substance really changes. 
         * Remember, loadFeed() is asynchronous. 
         */
        beforeEach(function(done) {
            loadFeed(0, function() {
                firstRun = $('.feed').html();
                loadFeed(1, function() {
                    done();
                });
            });
        });

        it('content changes when new feed is loaded', function() {
            expect(firstRun).toBeDefined();
            expect(secondRun).not.toBeDefined();
            secondRun = $('.feed').html();
            expect(secondRun).toBeDefined();
            expect(firstRun).not.toBe(secondRun);
        });
    });
}());