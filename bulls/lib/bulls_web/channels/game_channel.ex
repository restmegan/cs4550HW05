defmodule BullsWeb.GameChannel do
  use BullsWeb, :channel

  alias Bulls.Game

  @impl true
  def join("game:" <> _id, payload, socket) do
    if authorized?(payload) do
      game = Game.new
      socket = assign(socket, :game, game)
      view = Game.view(game)
      {:ok, view, socket}
    else
      {:error, %{reason: "unauthorized"}}
    end
  end

  # Channels can be used in a request/response fashion
  # by sending replies to requests from the client
  @impl true
  def handle_in("guess", %{"num" => ll}, socket) do
    game0 = socket.assigns[:game]
    game1 = Game.guess(game0, ll)
    socket1 = assign(socket, :game, game1)
    view = Game.view(game1)
    {:reply, {:ok, view}, socket}
  end

  # It is also common to receive messages from the client and
  # broadcast to everyone in the current topic (game:lobby).
  @impl true
  def handle_in("reset", _, socket) do
    game = Game.new
    socket = assign(socket, :game, game)
    view = Game.view(game)
    {:reply, {:ok, view}, socket}
  end

  # Add authorization logic here as required.
  defp authorized?(_payload) do
    true
  end
end
