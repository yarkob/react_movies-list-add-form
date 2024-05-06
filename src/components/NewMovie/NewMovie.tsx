import { ChangeEvent, FormEvent, useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

interface Props {
  onAdd: (movie: Movie) => void;
}

const pattern =
  // eslint-disable-next-line max-len
  /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/;

const isValidUrl = (url: string) => {
  if (!url) {
    return true;
  }

  return pattern.test(url);
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const emptyForm = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  };
  const [count, setCount] = useState(0);
  const [inputs, setInputs] = useState<Movie>(emptyForm);

  const isDisabled =
    !inputs.title.trim() ||
    !inputs.imgUrl.trim() ||
    !inputs.imdbUrl.trim() ||
    !inputs.imdbId.trim() ||
    !isValidUrl(inputs.imdbUrl) ||
    !isValidUrl(inputs.imgUrl);

  const inputHandler = (
    event: ChangeEvent<HTMLInputElement>,
  ): void | undefined => {
    const { name, value } = event.target;

    setInputs(prevState => {
      return { ...prevState, [name]: value };
    });
  };

  const submitHandler = (event: FormEvent) => {
    event.preventDefault();

    onAdd(inputs);

    setInputs(emptyForm);
    setCount(prevCount => prevCount + 1);
  };

  return (
    <form className="NewMovie" key={count} onSubmit={submitHandler}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={inputs.title}
        onChange={inputHandler}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={inputs.description}
        onChange={inputHandler}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={inputs.imgUrl}
        onChange={inputHandler}
        required
        isValid={isValidUrl(inputs.imgUrl)}
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={inputs.imdbUrl}
        onChange={inputHandler}
        required
        isValid={isValidUrl(inputs.imdbUrl)}
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={inputs.imdbId}
        onChange={inputHandler}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={isDisabled}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
