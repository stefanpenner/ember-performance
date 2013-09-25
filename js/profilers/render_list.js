/**
  Profiles the rendering of a list of many bound items.
**/
Perf.RenderListProfiler = Perf.Benchmark.extend({
  //testCount: 20,
  name: 'Render List',

  setup: function(){
    var listItems = [];
    for (var i=0; i<50; i++) {
      listItems.push("Item " + (i + 1));
    }

    this.set('listItems', listItems);
  },

  test: function() {
    var result = this.get('result');

    this.listItemsView = this.renderToScratch('listItems', {listItems: this.get('listItems')});
  },
  teardown: function() {
    this.listItemsView.destroy();
    this.listItemsView = null;
  }
});
