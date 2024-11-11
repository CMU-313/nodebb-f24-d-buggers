'use strict';

const translatorApi = module.exports;

translatorApi.translate = async function (postData) {
    const TRANSLATOR_API = 'https://d-buggers-translate-hmfmgsg4cpa5fcfp.canadacentral-01.azurewebsites.net';
    const response = await fetch(`${TRANSLATOR_API}/?content=${postData.content}`);
    const data = await response.json();
    return [data.is_english, data.translated_content];
};

