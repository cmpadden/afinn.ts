import { Afinn } from "./index";
import { describe, test, expect } from "vitest";

describe("tests translated from original implementation", () => {
  test("score", () => {
    const afinn = new Afinn({});
    expect(afinn.score("bad")).toBe(-3);
    expect(afinn.score("")).toEqual(0.0);
  });

  test("unicode", () => {
    const afinn = new Afinn({});
    expect(afinn.score("na\xefve")).toBeLessThan(0);
  });

  test("danish", () => {
    const afinn = new Afinn({ language: "da" });
    expect(afinn.score("bedrageri")).toBeLessThan(0);
    expect(afinn.score("besv\xe6r")).toBeLessThan(0);
    expect(afinn.score("D\xc5RLIG!!!")).toBeLessThan(0);
  });

  test("finnish", () => {
    const afinn = new Afinn({ language: "fi" });
    expect(afinn.score("juttu, katsokaa ja kuunnelkaa.")).toEqual(0);
  });

  test("french", () => {
    const afinn = new Afinn({ language: "fr" });
    expect(afinn.score("accidentelle")).toBeLessThan(0);
    expect(afinn.score("accus\xe9")).toBeLessThan(0);
    expect(afinn.score("sans charme")).toBeLessThan(0);
  });

  test("polish", () => {
    const afinn = new Afinn({ language: "pl" });
    expect(afinn.score("kurwa")).toBeLessThan(0);
    expect(afinn.score("ambitny")).toBeGreaterThan(0);
    expect(afinn.score("arcydzie\u0142o")).toBeGreaterThan(0);
  });

  test("swedish", () => {
    const afinn = new Afinn({ language: "sv" });
    expect(afinn.score("befrias")).toBeGreaterThan(0);
    expect(afinn.score("utm\xe4rkelse")).toBeGreaterThan(0);
    expect(afinn.score("ett snyggt")).toBeGreaterThan(0);
  });

  test("turkish", () => {
    const afinn = new Afinn({ language: "tr" });
    expect(afinn.score("kar")).toBeGreaterThan(0);
    expect(afinn.score("\xe7ok iyi")).toBeGreaterThan(0);
    expect(afinn.score("\xe7ok k\xf6t\xfc")).toBeLessThan(0);
  });

  test("score_with_pattern", () => {
    const afinn = new Afinn({ language: "da" });
    expect(afinn.score("ikke god")).toBeLessThan(0);
    expect(afinn.score("ikke god.")).toBeLessThan(0);
    expect(afinn.score("IKKE GOD-")).toBeLessThan(0);
    expect(afinn.score("ikke   god")).toBeLessThan(0);
    expect(afinn.score("En tv-succes sidste gang.")).toBeGreaterThan(0);
    expect(afinn.score("")).toBe(0.0);
  });

  //   // test('score_with_wordlist', () => {
  //   //     const afinn = new Afinn()
  //   //     expect(afinn.score_with_wordlist('Rather good.')).toBeGreaterThan(0)
  //   //     expect(afinn.score_with_wordlist('Rather GOOD.')).toBeGreaterThan(0)
  //   // })

  //   // test('score_with_wordlist_empty', () => {
  //   //     const afinn = new Afinn()
  //   //     expect(afinn.score_with_wordlist('')).toEqual(0.0)
  //   // })

  //   // test('emoticon', () => {
  //   //     const afinn = new Afinn()
  //   //     afinn.setup_from_file(join(afinn.data_dir(), 'AFINN-emoticon-8.txt'), word_boundary=False)
  //   //     expect(afinn.score(':-)')).toEqual(0)
  //   //     expect(afinn.score('This is a :-) smiley')).toBeGreaterThan(0)
  //   //     expect(afinn.score('Just so XOXO.')).toBeGreaterThan(0)
  //   // })

  //   test("words_and_emoticons", () => {
  //     const afinn = new Afinn({ emoticons: true });

  //     expect(afinn.score(":-)")).toBeGreaterThan(0);

  //     expect(afinn.score("BAD BAD BAD :-)")).toBeLessThan(0);
  //   });
});

// // test('emoticon_upper_case', () => {
// //     const afinn = new Afinn()
// //     afinn.setup_from_file(join(afinn.data_dir(), 'AFINN-emoticon-8.txt'), word_boundary=False)
// //     expect(afinn.score(':d')).toEqual(0)
// //     expect(afinn.score(':D')).toBeGreaterThan(0)
// //     expect(afinn.score('It is so: :D')).toBeGreaterThan(0)
// });
