<script lang="ts">
  import { black, grayLight, white } from './theme';
  import { borderBase, leadingTight, textSm } from './theme';

  export let link: string;
  export let uiText: string;
</script>

<mj-button
  line-height={leadingTight}
  font-size={textSm}
  font-weight={600}
  height="32px"
  align="left"
  href={link}
  background-color={black}
  color={grayLight}
  border-radius={borderBase}
  css-class="light-mode"
>
  {uiText}
</mj-button>
<mj-button
  line-height={leadingTight}
  font-size={textSm}
  font-weight={600}
  height="32px"
  align="left"
  href={link}
  background-color={white}
  color={black}
  border-radius={borderBase}
  css-class="dark-mode"
>
  {uiText}
</mj-button>
