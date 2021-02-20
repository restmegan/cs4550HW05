defmodule Bulls.Game do
  def new do
    %{
      guesses: [],
      evals: [],
      message: "",
      currGuess: 0,
      secretCode: random_code(),
    }
  end

  def guess(st, num) do
    eval = evalGuess(st, num)
    guesses = st.guesses
    evals = st.evals
    %{
      guesses: List.insert_at(guesses, Enum.count(guesses), num),
      evals: List.insert_at(evals, Enum.count(evals), eval),
      message: st.message,
      currGuess: st.currGuess,
     }
  end

  def evalGuess(st, num) do
    n = String.graphemes(num)
    Enum.join([exactMatches(n, st), "A", inexactMatches(n, st), "B"])
  end

  def exactMatches(splitNum, st) do
    handleExactMatches(splitNum, st, 0, 0)
  end

  def inexactMatches(splitNum, st) do
    handleInexact(splitNum, st, 0, 0)
  end

  def handleExactMatches(splitNum, st, i, count) do
    cond do
      i == 4 -> count
      isExact(splitNum, st, i) -> handleExactMatches(splitNum, st, i + 1, count + 1)
      true -> handleExactMatches(splitNum, st, i + 1, count)
    end
  end

  def handleInexact(splitNum, st, i, count) do
    cond do
      i == 4 -> count
      isInexact(splitNum, st, i) -> handleInexact(splitNum, st, i + 1, count + 1)
      true -> handleInexact(splitNum, st, i + 1, count)
    end
  end

  def isExact(splitNum, st, index) do
    String.to_integer(Enum.at(splitNum, index)) === Enum.at(st.secretCode, index) 
  end

  def isInexact(splitNum, st, index) do
    Enum.member?(st.secretCode, String.to_integer(Enum.at(splitNum, index))) && !isExact(splitNum, st, index)
  end

  def view(st) do
    st
  end

  # temporary, will do the generator later
  def random_code do
    Enum.random([ [6,7,5,1], [7,8,5,6], [5,4,7,9], [8,0,7,3], [3,5,2,1] ])
  end
end
