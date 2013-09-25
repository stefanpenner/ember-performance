Perf = Ember.Application.create();

function setupBenchmark(object, options) {
  var methods = {
    setup: function() {
      Ember.run(_currentContext, 'setup');
    },
    teardown: function() {
      Ember.run(_currentContext, 'teardown');
    },
    onCycle: function(event) {
      debugger;
      Ember.run(_currentContext, 'notifyPropertyChange', 'benchmark');
    },
    onComplete: function(data) {
      debugger;
      Ember.run(_currentContext, 'notifyPropertyChange', 'benchmark');
    },
    fn: function() {
      Ember.run(_currentContext, 'test');
    },
    async: true
  };

  var properties = object.getProperties(Ember.A(object.get('benchmarkProperties')));

  options = Ember.$.extend({}, properties, options, methods);

  return new Benchmark(options);
}

Perf.Benchmark = Ember.Object.extend({
  benchmarkProperties: ['name'],
  init: function() {
    this._super();

    this.benchmark = setupBenchmark(this, this.get('options'));
  },
  run: function() {
    Perf.ProfilerDisplay.instance().set('currentProfiler', this);
    window._currentContext = this;

    var benchmark = this.benchmark;
    benchmark.run();

    return this;
  },
  options: { },
  setup: Em.K,
  test: Em.K,
  teardown: Em.K,
  benchmark: null,

  renderToScratch: function(template, args) {
    var viewArgs = { templateName: template };
    var view = Ember.View.create(jQuery.extend(viewArgs, args || {}));
    view.appendTo('#scratch');
    return view;
  }
});

Perf.Benchmark.reopenClass({
  run: function() {
    return this.create().run();
  }
});

Perf.ApplicationRoute = Em.Route.extend({

  model: function() {
    return Perf.ProfilerDisplay.instance();
  },

  actions: {
    runProfiler: function(Benchmark) {
      this.controller.testRuns.pushObject(Benchmark.run());
    }
  }

});


Perf.ApplicationController = Ember.ObjectController.extend({

  profilers: function() {
    var profilers = [];
    for (var profilerClass in Perf) {
      if (/\wProfiler$/.test(profilerClass)) {
        profilers.push(Perf[profilerClass]);
      }
    }

    return profilers.map(function(profilerClass) {
      return {
        name: profilerClass.proto().name,
        profiler: profilerClass
      };
    });
  }.property(),

  testRuns: [],

  clearResults: function() {
    this.get('model').clearResults();
  }

});
