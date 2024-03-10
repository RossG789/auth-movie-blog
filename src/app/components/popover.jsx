import * as React from "react";
import * as Popover from "@radix-ui/react-popover";

const TimelinePopper = () => (
  <Popover.Root>
    <Popover.Trigger>MUVIE</Popover.Trigger>
    <Popover.Portal>
      <Popover.Content>
        Timeline
        <Popover.Arrow />
      </Popover.Content>
    </Popover.Portal>
  </Popover.Root>
);

export default TimelinePopper;
