/*
 ******************************************************************************
 * Cucumber/Gherkin
 * ============================================================================
 * 
 * NOTES:
 * - Arrow functions not supported by cucumber when accessing the 'world' class
 *   SEE: github.com/cucumber/cucumber-js/blob/main/docs/support_files/world.md
 * 
 ******************************************************************************
*/

const {After, Before, Given, Then, When} = require('@cucumber/cucumber');
const assert = require('assert');
const path = require('path');
const { workerData } = require('worker_threads');
const timeout = 10000;

Before({timeout}, async function() {
    this.browserBuild();
});

After({timeout}, async function() {
    await this.browserExit();
});

Given('the {word} page', {timeout}, async function(page) {
    const pages = {
        'home': 'https://www.amazon.co.uk/',
        'best sellers': 'https://www.amazon.co.uk/gp/bestsellers/?ref_=nav_cs_bestsellers_93528cc5dff843eb884b09097c806e03',
        'football': 'https://www.amazon.co.uk/s?k=football&ref=nb_sb_noss_1'
    }

    assert((pages[page] != null), 'Page not supported!');
    await this.browserNavigate(pages[page]);
});

When('{word} is searched for', async function(word) {
    this.text = word;

    const searchInput = await this.getElement('twotabsearchtextbox');
    const searchSubmit = await this.getElement('nav-search-submit-button');

    await searchInput.sendKeys(word);
    await searchSubmit.click();
});

Then('the {string} element should be {word}', async function(name, state) {
    const ids = {
        'search submit': 'nav-search-submit-button',
        'search input': 'twotabsearchtextbox',
        'sign in securely': 'a-autoid-0-announce'
    };

    const selectors = {
        'search submit': 'getElement',
        'search input': 'getElement',
        'sign in securely': 'getElement'
    };

    const tags = {
        'search submit': 'input',
        'search input': 'input',
        'sign in securely': 'span'
    };

    const id = ids[name];
    const selector = selectors[name];
    const tag = tags[name];

    assert((id != null), 'Element not supported!');
    assert((selector != null), 'Selector not supported!');
    assert((tag != null), 'Tag not supported!');

    switch(state) {
        case 'matching':
        case 'there': {
            const element = await this[selector](id);
            const actualTag = await element.getTagName();
            assert((actualTag == tag), 'Element is not of the correct type!');

            if (state == 'matching') {
                const actualText = await element.getText();
                console.log('ACTUAL TEXT: '+actualText+'!');
                assert((actualText == this.text), 'Element text does not match!');
            }
            
            break;
        }

        case 'missing': {
            assert.rejects(async () => await this[selector](id), 'Element exists when it should not!');
            break;
        }
        
        default: {
            assert.fail('State not supported!');
            break;
        }
    }
});

Then('the {word} page should be displayed', function(page) {
    const pages = {
        'home': 'https://www.amazon.co.uk/',
        'best sellers': 'https://www.amazon.co.uk/gp/bestsellers/?ref_=nav_cs_bestsellers_93528cc5dff843eb884b09097c806e03',
        'football': 'https://www.amazon.co.uk/s?k=football&ref=nb_sb_noss_1'
    }

    assert((pages[page] != null), 'Page not supported!');
    const currentUrl = this.getUrl();
    const expectedUrl = 'https://www.amazon.co.uk/s?k=football&ref=nb_sb_noss_1'
    console.log(currentUrl)
    assert(currentUrl === expectedUrl)

})

