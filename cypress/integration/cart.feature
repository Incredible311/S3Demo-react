Feature: 1. Cart Feature

As a customer
In order to purchase product to the cart
I want to check adding cart request

Scenario: 1.1 Add cart button should be visible when product hovered
    Given I visit the URL "http://localhost:3000"
    Then I should see product list
    Then I should mouseover on first product
    Then Add cart button should be visible