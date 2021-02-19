defmodule Bulls.Game do
  def new do
    %{
      guess: "",
      guesses: [],
      evals: [],
      message: "",
      currGuess: 0,
      secretCode: random_code(),
    }
  end

  def guess(st, num) do
    %{st | guesses: st.guesses ++ [num] }
  end

  def view(st) do
    st
  end

  # temporary, will do the generator later
  def random_code do
    Enum.random([ [6,7,5,1], [7,8,5,6], [5,4,7,9], [8,0,7,3], [3,5,2,1] ])
  end
end
