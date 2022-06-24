<script setup lang="ts">
  import { PropType, Ref } from 'vue'

  const { getConstants, getStyleOffset, getStyleToAnimate } = useAnimationUtils()

  const props = defineProps({
    animateTargets: {
      type: Array as PropType<string[]>,
      required: true
    },
    transitionSpeed: {
      type: Number,
      default: .15
    }
  })

  const animateEl = ref()
  const animationStyle = ref()
  const transitionStyle = ref()
  let mutationOberser : MutationObserver

  onMounted(() => {
    setObserver()
    if (animateEl.value) {
      setAnimation()
    }
  })

  onBeforeUnmount(() => {
    unsetObserver()
  })

  const setAnimation = () => {
    transitionStyle.value = `transition:all ${props.transitionSpeed}s ease;`
    const animationStyleArr = [] as string[]
    props.animateTargets.forEach((animateTarget : string) => {
      const style = getStyleToAnimate(animateEl.value, animateTarget)
      if (style === getConstants().FALLBACK) {
        animationStyleArr.push(`${animateTarget}:${style}`)
      } else {
        const styleInt = style as number
        animationStyleArr.push(`${animateTarget}:${styleInt + getStyleOffset(animateEl.value.parentElement, animateTarget)}px;`)
      }
    })
    animationStyle.value = animationStyleArr.toString().replace(',', '')
  }

  const setObserver = () => {
    mutationOberser = new MutationObserver(setAnimation);
    mutationOberser.observe(animateEl.value, {
      childList: true,
      subtree: true 
    });
  }
  const unsetObserver = () => {
    mutationOberser.disconnect();
  }
</script>

<template>
  <div class="animate" :style="`${animationStyle} ${transitionStyle}`" ref="animateEl">
    <slot />
  </div>
</template>

<style scoped>
  .animate {
    overflow: hidden;
  }
</style>