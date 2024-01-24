<script setup>
import { onMounted, computed, ref, watch } from "vue";
import { useRoute } from "vue-router";
import translateNamings from "../translateNamings.js";

const data = ref();
const route = useRoute();

const pageDataType = computed(() => route?.path);

const isDeletionEnabled = computed(
    () => pageDataType.value === "/visits" || pageDataType.value === "/patients"
);

onMounted(async () => {
    data.value = await fetch(`/api${pageDataType.value}`).then((res) =>
        res.json()
    );

    watch(route, async () => {
        data.value = await fetch(`/api${pageDataType.value}`).then((res) =>
            res.json()
        );
    });
});

const deleteItem = (item) => {
    if (item.passport) {
        fetch(`/api/patient?passport=${item.passport}`, {
            method: "DELETE",
        }).then((res) => {
            if (res.ok) {
                data.value = data.value.filter(
                    (obj) => obj.passport !== item.passport
                );
            }
        });
    } else if (item.visit_date) {
        const date = new Date(item.visit_date).toLocaleDateString("sv-SE");
        fetch(
            `/api/visit?visit_date=${date}&passport=${item.patient_passport}`,
            {
                method: "DELETE",
            }
        ).then((res) => {
            if (res.ok) {
                data.value = data.value.filter(
                    (obj) =>
                        obj.patient_passport !== item.patient_passport &&
                        obj.visit_date !== item.visit_date
                );
            }
        });
    }
};

const saveChanges = (item, index) => {
    const card = document.querySelectorAll(".card")[index];
    const elements = card.querySelectorAll("input:not(:disabled)");
    const data = new Object();

    Array.from(elements).forEach((element) => {
        const { id, value } = element;

        data[id] = value;
    });

    const url = `/api${pageDataType.value.slice(0, -1)}`;
    const options = {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    };

    switch (pageDataType.value) {
        case "/doctors":
            fetch(url + `?name=${item.full_name}`, options);
            return;
        case "/patients":
            fetch(url + `?passport=${item.passport}`, options);
            return;
        case "/services":
            fetch(url + `?name=${item.name}`, options);
            return;
        case "/visits":
            const date = new Date(item.visit_date).toLocaleDateString("sv-SE");
            fetch(
                url + `?visit_date=${date}&passport=${item.patient_passport}`,
                options
            );
            return;
        case "/rooms":
            fetch(url + `?number=${item.number}`, options);
            return;
        default:
            return;
    }
};

const isDisabledEditing = (fieldName) => {
    switch (route.path) {
        case "/doctors":
            return ["sex", "full_name"].includes(fieldName);
        case "/patients":
            return ["passport"].includes(fieldName);
        case "/services":
            return ["name"].includes(fieldName);
        case "/visits":
            return [
                "visit_date",
                "patient_passport",
                "doctor_name",
                "room_number",
            ].includes(fieldName);
        case "/service-lists":
            return true;
        case "/rooms":
            return ["number"].includes(fieldName);
        default:
            return true;
    }
};

const isAddNewBlockVisible = ref(false);

const addNewItem = () => {
    const card = document.querySelector("#new-card");
    const elements = card.querySelectorAll("input:not(:disabled)");
    const newData = new Object();

    Array.from(elements).forEach((element) => {
        const { id, value } = element;

        newData[id] = value;
    });

    const url = `/api/add-${pageDataType.value.slice(1, -1)}`;
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newData),
    };
    console.log(newData);

    fetch(url, options).then((res) => {
        if (res.ok) {
            location.reload();
        }
    });
};
</script>

<template>
    <h1>{{ translateNamings(pageDataType.slice(1)) }}</h1>
    <ul class="data-list">
        <li v-for="(item, index) in data" :key="index" class="card">
            <div
                v-for="([rowName, rowData], i) in Object.entries(item)"
                :key="i"
            >
                <label :for="rowName"> {{ rowName }}: </label>
                <input
                    type="text"
                    :id="rowName"
                    :value="rowData"
                    :disabled="isDisabledEditing(rowName)"
                />
            </div>

            <button class="save-button" @click="saveChanges(item, index)">
                Сохранить
            </button>
            <button
                @click="deleteItem(item)"
                v-if="isDeletionEnabled"
                class="delete-button"
            >
                Удалить
            </button>
        </li>
    </ul>
    <button
        class="add-button"
        @click="isAddNewBlockVisible = !isAddNewBlockVisible"
    >
        Добавить ещё
    </button>
    <div
        v-if="data?.length > 0 && isAddNewBlockVisible"
        class="card"
        id="new-card"
    >
        <div v-for="([rowName], i) in Object.entries(data[0])" :key="i">
            <label :for="rowName"> {{ rowName }}: </label>
            <input type="text" :id="rowName" />
        </div>
        <button class="save-button" @click="addNewItem()">Сохранить</button>
    </div>
    <div v-if="data?.length === 0">Ничего не нашлось</div>
</template>

<style scoped>
ul {
    display: block;
    list-style: none;
    padding-left: 0;
}

li {
    display: block;
}

.data-list {
    display: flex;
    flex-direction: column;
    gap: 15px;
    justify-content: center;
}

.card {
    background-color: whitesmoke;
    padding: 15px 20px;
    border-radius: 10px;
}

.card :last-child:is(button) {
    margin-top: 15px;
}

button {
    border: none;
    cursor: pointer;
    border-radius: 10px;
    padding: 10px 15px;
    padding-bottom: 9px;
    color: white;
}

.delete-button {
    background-color: tomato;
}

.save-button {
    background-color: orange;
}

.add-button {
    background-color: cadetblue;
    margin-bottom: 15px;
}

.save-button .save input {
    min-width: 200px;
}
</style>
