import React from "react";
import { render, fireEvent, screen, act } from "@testing-library/react";
import { Banner, Favourites, IBannerProps, WeatherReport } from "View/Components"; // Import your component
import { Subject } from "rxjs";
import { ICity } from "Models";
import { data } from "./data/cities";

const cities:ICity[] = data
const mockOnClick$ = new Subject<string>();

const mockBannerProps: IBannerProps = {
  cities,
  onClick$: mockOnClick$,
  backgroundImage: "",
};

describe("Banner component", () => {
  it("renders the component with initial state", () => {
    render(<Banner {...mockBannerProps} />);
    expect(screen.getByPlaceholderText("Find your location...")).toBeInTheDocument();
    expect(screen.getByText("Find")).toBeInTheDocument();
  });

  it("updates the input value and shows search results", () => {
    render(<Banner {...mockBannerProps} />);

    const inputElement = screen.getByPlaceholderText("Find your location...");
    fireEvent.change(inputElement, { target: { value: "Leipzig" } });
    expect(inputElement).toHaveValue("Leipzig");
    expect(screen.getByText("Leipzig")).toBeInTheDocument();
  });

  it("triggers the 'Find' button click and calls onClick$", () => {
    render(<Banner {...mockBannerProps} />);

    const inputElement = screen.getByPlaceholderText("Find your location...");
    fireEvent.change(inputElement, { target: { value: "Berlin" }});

    const findButton = screen.getByText("Find");
    fireEvent.click(findButton);

    mockOnClick$.subscribe((value) => {
      expect(value).toBe("Berlin");
    });
    expect(inputElement).toHaveValue("");
  });

  it("clicking on a search result item sets the input value and hides results", () => {
    render(<Banner {...mockBannerProps} />);

    const inputElement = screen.getByPlaceholderText("Find your location...");
    fireEvent.change(inputElement, { target: { value: "Stuttgart" }});

    const searchResultItem = screen.getByText("Stuttgart");
    fireEvent.click(searchResultItem);

    expect(inputElement).toHaveValue("Stuttgart");
    expect(screen.queryByText("Stuttgart")).toBeNull();
  });

  it("clears search results when input is empty", () => {
    render(<Banner {...mockBannerProps} />);

    const inputElement = screen.getByPlaceholderText("Find your location...");
    fireEvent.change(inputElement, { target: { value: "Cologne" }});
    expect(screen.getByText("Cologne")).toBeInTheDocument();

    fireEvent.change(inputElement, { target: { value: "" }});
    expect(inputElement).toHaveValue("");
    expect(screen.queryByText("Cologne")).toBeNull();
  });

  it('WeatherReport renders correctly', () => {
    render(
      <WeatherReport city={data[0]} onFavourite$={new Subject()} />
    );
  
    const cityElement = screen.getByText('Berlin');
    expect(cityElement).toBeInTheDocument();
  
    const iconElement = screen.getByTestId('favorite-icon');
    expect(iconElement).toBeInTheDocument();
  
  });

  it('WeatherReport favorite button click', () => {
    const onFavouriteMock = new Subject<number>();
    render(
      <WeatherReport city={data[0]} onFavourite$={onFavouriteMock} />
    );
  
    const favoriteButton = screen.getByTestId('favorite-svg');
  
    fireEvent.click(favoriteButton);
  
    onFavouriteMock.subscribe((cityId) => {
      expect(cityId).toEqual(data[0].id);
    });

});

it('Favourites renders correctly', () => {
 render(
      <Favourites
        favourites={[data[1]]}
        onRemoveFavourite$={new Subject()}
      />
    );

    const titleElement = screen.getByText('Favourite Cities');
    expect(titleElement).toBeInTheDocument();
  
    const city1Element = screen.getByText('Leipzig');
    expect(city1Element).toBeInTheDocument();
  
    const favoriteButton1 = screen.getByTestId('favorite-svg');
    expect(favoriteButton1).toBeInTheDocument();

  });

  it('Favourites favorite button click', () => {
    const onRemoveFavouriteMock = new Subject<number>();
    render(
      <Favourites
        favourites={[data[1]]}
        onRemoveFavourite$={onRemoveFavouriteMock}
      />
    );
  
    const favoriteButton1 = screen.getByTestId('favorite-svg');
  
    fireEvent.click(favoriteButton1);
  
    onRemoveFavouriteMock.subscribe((cityId) => {
      expect(cityId).toEqual(data[0].id);
    });

});
 
});
