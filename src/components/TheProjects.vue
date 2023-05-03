<script setup lang="ts">
import ProjectItem from './ProjectItem.vue'

import ToolingIcon from './icons/IconTooling.vue'
import EcosystemIcon from './icons/IconEcosystem.vue'
import CommunityIcon from './icons/IconCommunity.vue'
import SupportIcon from './icons/IconSupport.vue'
</script>

<template>
    <ProjectItem>
        <template #icon>
            <ToolingIcon />
        </template>
        <template #heading>Watch</template>
        You can share movie, anime, and more
    </ProjectItem>

    <ProjectItem>
        <template #icon>
            <EcosystemIcon />
        </template>
        <template #heading>Music</template>
        aba aba aba
    </ProjectItem>

    <ProjectItem>
        <template #icon>
            <CommunityIcon />
        </template>
        <template #heading>Community</template>
        send message
    </ProjectItem>

    <ProjectItem>
        <template #icon>
            <SupportIcon />
        </template>
        <template #heading>Support</template>

        if you like the project, please v me 50
    </ProjectItem>
</template>
