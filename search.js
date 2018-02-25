// Material design or other animation

var s,
SearchWiki = {
    settings: {
        inputSearch: $("#search-input"),
        submitSearch: $("#submit-search"),
        searchResults: $("#search-results"),
        searchAPIUrl: "https://en.wikipedia.org/w/api.php?action=opensearch&namespace=0&srprop=snippet&format=json&search="
    },

    init: function() {
        s = this.settings;
        this.bindUIActions();
    },

    bindUIActions: function() {
        s.inputSearch.keydown(function(e) {
            if (e.which == 13) {
                var item = s.inputSearch.val();
                SearchWiki.getSearchResults(item);
            }
        });

        s.submitSearch.click(function() {
            var item = s.inputSearch.val();
            SearchWiki.getSearchResults(item);
        });
    },

    getSearchResults: function(item) {
        a.acBox.addClass('hide');
        OpenSearchArea.closeOverlay();
        s.searchResults.empty();
        if(typeof item !== "undefined") {
            var searchURL = s.searchAPIUrl + item + "&callback=?";

            var list = $("<ul>", {
                "class" : "results-list"
            }).appendTo(s.searchResults);

            $.getJSON(searchURL, function(data) {
                
                for (i=0;i<data[1].length;i++) {
                    var link = $("<a>", {
                        "href" : data[3][i],
                        "class": "results-link"
                    }).appendTo(list);

                    var item = $("<li>", {
                        "class" : "search-item"
                    }).appendTo(link);

                    $("<h2>", {
                        "text" : data[1][i],
                        "class": "search-item-title"
                    }).appendTo(item);

                    $("<p>", {
                        "text" : data[2][i],
                        "class": "search-item-content"
                    }).appendTo(item);

                }
            })
        }
    }
}

var a,
AutoComplete = {
    settings: {
        autoCompleteURL: "https://en.wikipedia.org/w/api.php?action=opensearch&format=json&formatversion=2&namespace=0&limit=10&suggest=true&search=",
        acBox: $('#autocomplete-box')
    },

    init: function() {
        a = this.settings;
        this.bindUIActions();
    },

    bindUIActions: function() {
        s.inputSearch.keyup(function(e) {
            if (e.which !== 13) {
                var term = s.inputSearch.val();
                a.acBox.removeClass('hide');
                AutoComplete.getAutoCompleteResults(term);
            }
        });

        a.acBox.on('click', '.autocomplete-item', function() {
            var item = $(this).text();
            AutoComplete.chooseAutoCompleteItem(item);
        });

    },

    getAutoCompleteResults: function(term) {
        if (typeof term !== "undefined") {
            o.inputSearchFake.val(term);
            var acSearch = a.autoCompleteURL + term + "&callback=?";

            $.getJSON(acSearch, function(data) {
                a.acBox.empty();
                for (i=0;i<data[1].length;i++) {
                    var item = $("<li>", {
                        "class" : "autocomplete-item",
                        "text"  : data[1][i]
                    }).appendTo(a.acBox);
                }
            })
        }
    },

    chooseAutoCompleteItem: function(item) {
        SearchWiki.getSearchResults(item);
    }
}

var o,
OpenSearchArea = {
    settings: {
        searchBoxArea: $('#search-box-area'),
        inputSearchFake: $('#search-input--fake'),
        searchClose: $('#search-close')
    },

    init: function() {
        o = this.settings;
        this.bindUIActions();
    },

    bindUIActions: function() {

        o.inputSearchFake.click(function() {
            o.searchBoxArea.addClass('open');
            s.inputSearch.focus();
        });

        o.searchClose.click(function() {
            OpenSearchArea.closeOverlay();
        });


    },

    closeOverlay: function() {
        o.searchBoxArea.removeClass('open');
    }
}



$(document).ready(function() {
    SearchWiki.init();
    AutoComplete.init();
    OpenSearchArea.init();
   
});