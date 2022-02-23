// AFINN dictionary-based sentiment analysis ported to Javascript
//
// Improvement Ideas:
// - dynamically load dictionaries, either from `import()` statement, or downloading from GitHub
// - return scores w/ token mappings eg. [{ token: 'bad', score: 0.0 }]


import AFINN_DA from "./data/AFINN-da-32.txt?raw";
import AFINN_EN from "./data/AFINN-en-165.txt?raw";
import AFINN_FI from "./data/AFINN-fi-165.txt?raw";
import AFINN_FR from "./data/AFINN-fr-165.txt?raw";
import AFINN_PL from "./data/AFINN-pl-165.txt?raw";
import AFINN_SV from "./data/AFINN-sv-165.txt?raw";
import AFINN_TR from "./data/AFINN-tr-165.txt?raw";
import AFINN_EMOTICONS from "./data/AFINN-emoticon-8.txt?raw";

/**
 * Languages with corresponding sentiment dictionaries
 */
type SupportedLanguage =
  | "en"
  | "da"
  | "fi"
  | "fr"
  | "pl"
  | "sv"
  | "tr"
  | "emoticons";

/**
 * Key-value word dictionary container
 */
type WordDictionary = {
  [key: string]: number;
};

/**
 * Mapping of language codes to sentiemnt dictionary
 */
const LANGUAGE_FILENAME_MAPPING = {
  da: AFINN_DA,
  en: AFINN_EN,
  emoticons: AFINN_EMOTICONS,
  fi: AFINN_FI,
  fr: AFINN_FR,
  pl: AFINN_PL,
  sv: AFINN_SV,
  tr: AFINN_TR,
};

/**
 * Constructor parameters for AFINN object
 */
interface AfinnOptions {
  language?: string;
  emoticons?: boolean;
  wordBoundary?: boolean;
}

export default class Afinn {
  language: SupportedLanguage;
  emoticons: boolean;
  wordBoundary: boolean;
  dictionary: WordDictionary;

  /**
   * @param language - Specify language dictionary (default: en)
   * @param emoticons - Include emoticons in the token list (default: false)
   * @param wordBoundary - Use word boundary match in the regular expression (default: false)
   */
  constructor({
    language = "en",
    emoticons = false,
    wordBoundary = false,
  }: AfinnOptions) {
    this.language = language as SupportedLanguage;
    this.emoticons = emoticons;
    this.wordBoundary = wordBoundary;
    this.dictionary = this.loadDictionary();
  }

  /**
   * Escape regex-specific chracters from a string
   *
   * @param text - string to escape characters
   *
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions#escaping
   */
  regexEscape(text: string): string {
    return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }

  /**
   * Construct a regular expression given a list of tokens
   *
   * @param tokens - array of words to construct a regular expression
   */
  regexFromWords(tokens: Array<string>): RegExp {
    const tokensEscaped = tokens
      .sort((a, b) => b.length - a.length) // longest tokens must come first to prevent sub-string matches
      .map((s) => this.regexEscape(s)); // some tokens may contain problematic characters

    return new RegExp(tokensEscaped.join("|"), "gu");
  }

  /**
   * Extract words from `text` that are present in the word dictionary
   *
   * @param text - text to search for dictionary words
   * @param cleanWhitespace - optionally convert sequential whitespace into a single whitespace
   *
   */
  extractMatchingDictionaryWords(
    text: string,
    cleanWhitespace = true
  ): Array<string> {
    if (cleanWhitespace) {
      text = text.replace(/\s+/, " ");
    }
    const wordPattern = this.regexFromWords(Object.keys(this.dictionary));
    const matches = text.match(wordPattern);
    return matches || [];
  }

  /**
   * Compute individual sentiment scores for words and phrases in a given piece of `text`
   *
   * @param text - string to computer sentiment score
   */
  scores(text: string): Array<{ word: string, score: number}> {
    const tokens = this.extractMatchingDictionaryWords(text.toLowerCase());
    return tokens.map((token) => {
      return { word: token, score: this.dictionary[token] };
    });
  }

  /**
   * Compute aggregated sentiment score for words in a given piece of `text`
   *
   * @param text - string to computer sentiment score
   */
  score(text: string): number {
    return this.scores(text).reduce((sum, score) => sum + score.score, 0);
  }

  /**
   * Load language specific sentiment word-dictionary
   *
   * @param language - language code of dictionary
   */
  loadDictionary(): WordDictionary {
    const dictionary = {} as WordDictionary;
    LANGUAGE_FILENAME_MAPPING[this.language]
      .split("\n")
      .forEach((line: string) => {
        const [word, score] = line.split("\t");
        if (!(word === "" || isNaN(parseFloat(score)))) {
          dictionary[word.trim()] = parseFloat(score);
        }
      });
    return dictionary;
  }
}
