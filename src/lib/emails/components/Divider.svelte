<script lang="ts">
  import { grayDark, grayLight } from './theme';

  export let bottomPadding = false;
</script>

<mj-divider
  css-class="light-mode"
  border-color={grayLight}
  border-width="1px"
  padding={bottomPadding ? '24px' : '24px 24px 0px'}
/>
<mj-divider
  css-class="dark-mode"
  border-color={grayDark}
  border-width="1px"
  padding={bottomPadding ? '24px' : '24px 24px 0px'}
/>
