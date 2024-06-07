import "@duskit/css/src/theme.css";
import "./app.css";
import { IntersectionObserverMock } from "@duskit/test-helpers";

window.IntersectionObserver = IntersectionObserverMock;
