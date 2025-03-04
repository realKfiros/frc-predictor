export interface Metrics {
	win_prob: {
		count: number;
		conf: any;
		acc: any;
		mse: any;
	};
	score_pred: {
		count: number;
		rmse: any;
		error: any;
	};
	rp_pred: {
		count: number;
		auto_rp: {
			error: any;
			acc: any;
		};
		coral_rp: {
			error: any;
			acc: any;
		};
		barge_rp: {
			error: any;
			acc: any;
		}[];
	};
}
