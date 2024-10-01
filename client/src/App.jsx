import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Home1 from "./pages/Home1/Home1";
import Result from "./pages/Result/Result";
import Preview from "./pages/Preview/Preview";
import { ItemsProvider } from "./context/itemContext";
import { MatrixProvider } from "./context/matrixContext";
import { SingleChoiceProvider } from "./context/singleChoiceContext";
import { MultipleChoiceProvider } from "./context/MultipleChoiceContext";
import { PictureChoiceProvider } from "./context/PictureChoiceContext";
import { DropdownProvider } from "./context/dropdownContext";
import { ScaleRatingProvider } from "./context/ScaleRatingContext";
import { StarRatingProvider } from "./context/starRatingContext";
import { VisibleOptionsProvider } from "./context/VisibleOptionsContext";
import { OptionsProvider } from "./context/OptionsContext";
import Layout from "./components/Layout/Layout";

function App() {
  return (
    <>
      <BrowserRouter>
        <OptionsProvider>
          <ItemsProvider>
            <VisibleOptionsProvider>
              <StarRatingProvider>
                <ScaleRatingProvider>
                  <MatrixProvider>
                    <DropdownProvider>
                      <PictureChoiceProvider>
                        <MultipleChoiceProvider>
                          <SingleChoiceProvider>
                            <Routes>
                              <Route path="/" element={<Home1 />} />
                              <Route path="/:formId" element={<Result />} />
                              <Route
                                path="/:formId/preview"
                                element={<Preview />}
                              />
                            </Routes>
                          </SingleChoiceProvider>
                        </MultipleChoiceProvider>
                      </PictureChoiceProvider>
                    </DropdownProvider>
                  </MatrixProvider>
                </ScaleRatingProvider>
              </StarRatingProvider>
            </VisibleOptionsProvider>
          </ItemsProvider>
        </OptionsProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
