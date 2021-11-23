Feature: Youtube

    Scenario: Initially has a search bar
        Given the home page
        Then the 'search input' element should be there
    
    Scenario: Initially has a sign in securely button
        Given the home page
        Then the 'sign in securely' element should be there

    Scenario: Initially has a search submit button
        Given the home page
        Then the 'search submit' element should be there
    
    Scenario: Searching for football changes the page to football
        Given the home page
        When football is searched for
        Then the football page should be displayed

    # Scenario: Initially has no location heading
    #     Given the Youtube page
    #     Then the 'location heading' element should be missing
    
    # Scenario: Location heading exists after a search
    #     Given the Youtube page
    #     When the 'Bridgnorth' location is searched for
    #     Then the 'location heading' element should be there
    
    # Scenario: Location heading matches after a search
    #     Given the Youtube page
    #     When the 'Bridgnorth' location is searched for
    #     Then the 'location heading' element should be matching
