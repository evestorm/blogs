<template>
    <div class="home-more">
        <!-- todo -->
    </div>
</template>
<script setup></script>
<style lang="scss">
.home-more {
    overflow-x: hidden;
    $mainColor: #a20300;
    .line-box {
        .line-item {
            display: flex;
            justify-content: space-between;
            margin-bottom: 5px;
            align-items: center;
            .logo {
                height: 36px;
                width: 36px;
                font-size: 30px;
                margin-bottom: -4px;
            }
            .name {
                flex: 1 1 50%;
                padding-left: 10px;
            }
            .describe {
                flex: 1 1 50%;
                color: #999;
            }
            .action {
                flex: 0 0 200px;
                text-align: right;
            }
        }
    }
    .time-title,
    .table-title {
        margin-bottom: 20px;
        font-weight: bold;
        font-size: 20px;
    }
    .table-box {
        text-align: center;
        margin-top: 100px;
        .line {
            display: flex;
            justify-content: center;
            padding: 2px 0;
        }
    }
    .time-line {
        text-align: center;
        margin-top: 100px;
        .line {
            padding: 2px 0;
            .year {
                font-weight: bold;
            }
        }
    }
}
</style>
