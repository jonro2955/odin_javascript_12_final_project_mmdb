import "@testing-library/jest-dom";
import { getAverageScore } from "../files/pages/MoviePage";

test("Get average score", () => {
  const reviews = [{ stars: 6 }, { stars: 10 }];
  const movieObject = { vote_average: 7, vote_count: 5 };
  expect(getAverageScore(reviews, movieObject)).toBe((7.2857).toFixed(1));
});
