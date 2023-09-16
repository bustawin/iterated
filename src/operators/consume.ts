import {It} from "../utils";
import {iterator, next} from "../iterators";

export function consume<IterValue>(iter: It<IterValue>): void {
  const it = iterator(iter)
  let item = next(it)

  while (!item.done) item = next(it)
}
