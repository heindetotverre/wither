<script setup lang="ts">
  import { PropType, nextTick } from 'vue'

  const { getConstants, getStyleToAnimate } = useAnimationUtils()

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

  const animateEl = ref(),
    animationStyle = ref(),
    transitionStyle = ref()
  let mutationOberser : MutationObserver

  onMounted(async () => {
    setObserver()
    setAnimation([])
  })

  onBeforeUnmount(() => {
    unsetObserver()
  })

  const setAnimation = (mutations : MutationRecord[]) => {
    const obtainStyles = () => {
      transitionStyle.value = `transition:all ${props.transitionSpeed}s ease;`
      const animationStyleArr = [] as string[]
      props.animateTargets.forEach((animateTarget : string) => {
        const style = getStyleToAnimate(animateEl.value, animateTarget)
        if (style === getConstants().FALLBACK) {
          animationStyleArr.push(`${animateTarget}:${style}`)
        } else {
          const styleInt = style as number
          animationStyleArr.push(`${animateTarget}:${styleInt}px;`)
        }
      })
      animationStyle.value = animationStyleArr.toString().replace(',', '')
    }
    setTimeout(() => {
      obtainStyles()
    }, mutations.length || 5)
  }

  const setObserver = () => {
    mutationOberser = new MutationObserver(setAnimation);
    mutationOberser.observe(animateEl.value, {
      childList: true,
      subtree: true,
      attributes: true
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