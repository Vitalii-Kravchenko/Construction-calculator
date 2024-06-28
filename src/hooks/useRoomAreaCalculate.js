import {useSelector} from "react-redux";

import store from "../store";

import {selectById} from "../components/calculator/roomArea/roomAreaSlice";

const useRoomAreaCalculate = (formulaName = '', count = 0) => {
    const area = useSelector(
        state => state.roomArea.roomAreaTotalSize.area,
    );
    const height = useSelector(
        state => state.roomArea.roomAreaTotalSize.height,
    );

    const calculate = (formulaName, count) => {
        switch (formulaName) {
            case 'calculateGeneralWork':
                return area * 20;
            case 'calculateWallWork':
                return ((4 * area) * height) * count;
            case 'calculatePlinthWork':
                return (4 * area) * count;
            case 'calculateWindowWork':
                if ((area / 7.5) < 0.5) {
                    return 0;
                } else if ((area / 7.5) > 0.5 && (area / 7.5) <= 1) {
                    return area * count;
                } else {
                    return Math.ceil(area / 7.5) * count;
                }
            case 'calculateDoorWork':
                if ((area / 25) < 0.5) {
                    return 0;
                } else if ((area / 25) > 0.5 && (area / 25) <= 1) {
                    return area * count;
                } else {
                    return Math.ceil(area / 25) * count;
                }
            case 'calculateTileWork':
                const bathroom = selectById(store.getState(), 'bathroom_bath_or_shower').value;
                const bathroom_toilet = selectById(store.getState(), 'bathroom_toilet').value;

                return (bathroom * bathroom_toilet) * count;
            case 'calculateSpecialWork':
                return count;
            default:
                return 0;
        }
    }

    return {calculate};
}

export default useRoomAreaCalculate;