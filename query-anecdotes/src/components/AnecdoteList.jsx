
import { useContext } from "react";
import NotificationContext from "../../NotificationContext";


const AnecdoteList = ({ anecdotes, voteMutation }) => {
  const { dispatch } = useContext(NotificationContext);

  const handleVote = (anecdote) => {
    voteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 });

    dispatch({ type: "VOTE", payload: anecdote.content });

    setTimeout(() => {
      dispatch({ type: "CLEAR" });
    }, 5000);
  };

  return (
    <div>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnecdoteList;
