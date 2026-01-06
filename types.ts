
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

export interface ArtForm {
  id: string;
  name: string;
  description: string;
  image: string;
  video: string;
}

export interface Occasion {
  id: string;
  title: string;
  image: string;
  video: string;
  description: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
}

/**
 * Interface for Artist data used in ArtistCard component.
 */
export interface Artist {
  id: string;
  name: string;
  genre: string;
  image: string;
  day: string;
}
