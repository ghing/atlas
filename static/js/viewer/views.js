/**
 * Views for the story viewer Backbone application
 */
Namespace('storybase.viewer');

storybase.viewer.views.ViewerApp = Backbone.View.extend({
  events: {
    "click nav .next"     : "nextSection",
    "click nav .previous" : "prevSection"
  },

  initialize: function() {
    this.navigationView = new storybase.viewer.views.StoryNavigation(); 
    this.sections = this.options.sections;
    this.story = this.options.story;
    this.currentSection = this.sections.at(0);
    this.navigationView.setSection(this.currentSection);
  },

  render: function() {
    this.$('footer').append(this.navigationView.el);
    this.navigationView.render();
    return this;
  },

  nextSection: function() {
    //console.debug('Clicked next');
    //console.debug('Current section is ' + this.currentSection.id);
    var nextId = this.currentSection.get('next_section_id');
    if (nextId) {
      this.currentSection = this.sections.get(nextId);
      this.navigationView.setSection(this.currentSection);
      //console.debug('New section is ' + this.currentSection.id);
    }
  },

  prevSection: function() {
    //console.debug('Clicked previous');
    //console.debug('Previous section is ' + this.currentSection.id);
    var prevId = this.currentSection.get('previous_section_id');
    if (prevId) {
      this.currentSection = this.sections.get(prevId);
      this.navigationView.setSection(this.currentSection);
      //console.debug('New section is ' + this.currentSection.id);
    }
  }
});

storybase.viewer.views.StoryHeader = Backbone.View.extend({
  render: function() {
    return this;
  }
});

storybase.viewer.views.StoryNavigation = Backbone.View.extend({
  tagName: 'nav',

  className: 'story-nav',

  render: function() {
    var nextSection = this.section.collection.get(
      this.section.get('next_section_id'));
    var prevSection = this.section.collection.get(
      this.section.get('previous_section_id'));
    this.$el.html(ich.navigationTemplate({
      next_section: nextSection,
      previous_section: prevSection
    }));
    return this;
  },

  setSection: function(section) {
    this.section = section;
    this.render();
  }
});
