type ResponseStatus = 'ok' | 'error' | 'bad-data';

type Book = {
  id: number;
  title: string;
  author: string;
  cover: string;
  totalEpisodes: number;
  status: 'active' | 'soon';
};

export type GetBooksResult = { kind: ResponseStatus; books: Book[] };
export type GetBookResult = { kind: ResponseStatus; book: Book };

// export type GetEpisodeSummariesResult =
//   | { kind: 'ok'; episodeSummaries: EpisodeSummary[] }
//   | GeneralApiProblem;
// export type GetEpisodeSummaryResult =
//   | { kind: 'ok'; episodeSummary: EpisodeSummary }
//   | GeneralApiProblem;

// export type GetEpisodesResult =
//   | { kind: 'ok'; episodes: Episode[] }
//   | GeneralApiProblem;
// export type GetEpisodeResult =
//   | { kind: 'ok'; episode: Episode }
//   | GeneralApiProblem;

// export { Book, EpisodeSummary, Episode };
