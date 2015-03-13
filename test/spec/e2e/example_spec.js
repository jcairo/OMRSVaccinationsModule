'use strict';

describe('Vaccination module', function() {
  it('it should accept a search term for a vaccination', function() {
    browser.get('http://localhost:9000');

    element(by.model('search.name')).sendKeys('polio');

    expect(element.all(by.repeater('vaccination in vaccinations')).count()).toEqual(3);

  });
  /*
  describe('todo list', function() {
    var todoList;

    beforeEach(function() {
      browser.get('http://www.angularjs.org');

      todoList = element.all(by.repeater('todo in todos'));
    });

    it('should list todos', function() {
      expect(todoList.count()).toEqual(2);
      expect(todoList.get(1).getText()).toEqual('build an angular app');
    });

    it('should add a todo', function() {
      var addTodo = element(by.model('todoText'));
      var addButton = element(by.css('[value="add"]'));

      addTodo.sendKeys('write a protractor test');
      addButton.click();

      expect(todoList.count()).toEqual(3);
      expect(todoList.get(2).getText()).toEqual('write a protractor test');
    });
  });
*/
});
