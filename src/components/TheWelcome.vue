<script setup lang="ts">
import WelcomeItem from './WelcomeItem.vue'

import ToolingIcon from './icons/IconTooling.vue'
import EcosystemIcon from './icons/IconEcosystem.vue'
import CommunityIcon from './icons/IconCommunity.vue'
import SupportIcon from './icons/IconSupport.vue'
</script>

<template>
    <WelcomeItem>
        <template #icon>
            <ToolingIcon />
        </template>
        <template #heading>Watch</template>
        You can share movie, anime, and more


    </WelcomeItem>

    <WelcomeItem>
        <template #icon>
            <EcosystemIcon />
        </template>
        <template #heading>Music</template>
        aba aba aba

    </WelcomeItem>

    <WelcomeItem>
        <template #icon>
            <CommunityIcon />
        </template>
        <template #heading>Community</template>
        send message

    </WelcomeItem>

    <WelcomeItem>
        <template #icon>
            <SupportIcon />
        </template>
        <template #heading>Support</template>

        if you like the project, please v me 50
    </WelcomeItem>
</template>
