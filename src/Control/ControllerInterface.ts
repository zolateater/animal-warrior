import MoveAction from "./MoveAction";
import LookAction from "./LookAction";

export default interface ControllerInterface
{
   onMoveAction(handler: (action: MoveAction) => void): void;
   onLookAction(handler: (action: LookAction) => void): void;
   // TODO: add other actions later.
}
